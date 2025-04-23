import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { Upload } from "@aws-sdk/lib-storage";
import s3Client from "@/lib/s3Client";
import { createReadStream } from "fs";
import formidable, { File, Fields, Files } from "formidable";
import type { Submission } from "@/types/submission";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to use formidable
  },
};

async function uploadToS3(file: File): Promise<string> {
  const key = `uploads/${Date.now()}-${file.originalFilename}`;
  const s3Endpoint = process.env.S3_ENDPOINT;

  if (!s3Endpoint) {
    throw new Error("S3_ENDPOINT environment variable is not defined.");
  }

  console.log("Uploading file to S3:", key);
  console.log("File details:", file);

  const upload = new Upload({
    client: s3Client,
    params: {
      Key: key,
      Bucket: process.env.S3_BUCKET_NAME!,
      Body: createReadStream(file.filepath),
      ContentType: file.mimetype || "application/octet-stream",
    },
  });

  await upload.done();
  return `${s3Endpoint}/${process.env.S3_BUCKET_NAME}/${key}`;
}

// Utility function to extract and validate a field
function extractField(field: string | string[] | undefined): string {
  if (Array.isArray(field)) {
    return field[0] || "";
  }
  return field !== undefined ? String(field) : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields: Fields, files: Files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ error: "Failed to parse form data" });
      }

      try {
        // Validate required fields
        const requiredFields = ["wardNo", "houseNo", "residentName", "mobileNo", "address", "propertyType"];
        for (const field of requiredFields) {
          if (!extractField(fields[field])) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
          }
        }

        const propertyPhotoUrl = files.propertyPhoto
          ? await uploadToS3(Array.isArray(files.propertyPhoto) ? files.propertyPhoto[0] : files.propertyPhoto)
          : null;

        const pipelinePhotoUrl = files.pipelinePhoto
          ? await uploadToS3(Array.isArray(files.pipelinePhoto) ? files.pipelinePhoto[0] : files.pipelinePhoto)
          : null;

        const waterTaxBillUrl = files.waterTaxBill
          ? await uploadToS3(Array.isArray(files.waterTaxBill) ? files.waterTaxBill[0] : files.waterTaxBill)
          : null;

        const submission: Submission = {
          wardNo: extractField(fields.wardNo),
          houseNo: extractField(fields.houseNo),
          residentName: extractField(fields.residentName),
          mobileNo: extractField(fields.mobileNo),
          address: extractField(fields.address),
          households: parseInt(extractField(fields.households) || "0", 10),
          propertyType: extractField(fields.propertyType),
          waterConnection: JSON.parse(extractField(fields.waterConnection) || "{}"),
          propertyPhoto: propertyPhotoUrl,
          pipelinePhoto: pipelinePhotoUrl,
          waterTaxBill: waterTaxBillUrl,
        };

        console.log("Parsed submission data:", submission);

        // Validate numeric fields
        if (isNaN(submission.households) || submission.households <= 0) {
          return res.status(400).json({ error: "Invalid value for households. Must be a positive number." });
        }

        const createdSubmission = await prisma.submission.create({
          data: {
            wardNo: extractField(fields.wardNo),
            houseNo: extractField(fields.houseNo),
            residentName: extractField(fields.residentName),
            mobileNo: extractField(fields.mobileNo),
            address: extractField(fields.address),
            households: parseInt(extractField(fields.households) || "0", 10),
            propertyType: extractField(fields.propertyType),
            waterConnection: JSON.parse(extractField(fields.waterConnection) || "{}"),
            propertyPhoto: propertyPhotoUrl,
            pipelinePhoto: pipelinePhotoUrl,
            waterTaxBill: waterTaxBillUrl,
          },
        });

        res.status(201).json(createdSubmission);
      } catch (error) {
        console.error("Error saving submission:", error);
        res.status(500).json({ error: "Failed to save submission" });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
