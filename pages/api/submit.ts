import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import Busboy from "busboy";
import { Upload } from "@aws-sdk/lib-storage";
import s3Client from "@/lib/s3Client";
import type { BusboyConfig } from "busboy";
import type { Submission } from "@/types/submission";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FormData {
  [key: string]: string | { filename: string; encoding: string; mimetype: string; data: Buffer };
}

async function uploadToS3(file: { data: Buffer; filename: string; mimetype: string }): Promise<string> {
  const key = `uploads/${Date.now()}-${file.filename}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.data,
      ContentType: file.mimetype,
    },
  });

  await upload.done();
  return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${key}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const busboy = Busboy({ headers: req.headers } as BusboyConfig);
    const formData: FormData = {};

    busboy.on("file", (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
      const chunks: Buffer[] = [];
      file.on("data", (chunk: Buffer) => chunks.push(chunk));
      file.on("end", () => {
        formData[fieldname] = {
          filename,
          encoding,
          mimetype,
          data: Buffer.concat(chunks),
        };
      });
    });

    busboy.on("field", (fieldname: string, value: string) => {
      formData[fieldname] = value;
    });

    busboy.on("finish", async () => {
      try {
        const propertyPhotoUrl = formData.propertyPhoto
          ? await uploadToS3(formData.propertyPhoto as { data: Buffer; filename: string; mimetype: string })
          : null;

        const pipelinePhotoUrl = formData.pipelinePhoto
          ? await uploadToS3(formData.pipelinePhoto as { data: Buffer; filename: string; mimetype: string })
          : null;

        const waterTaxBillUrl = formData.waterTaxBill
          ? await uploadToS3(formData.waterTaxBill as { data: Buffer; filename: string; mimetype: string })
          : null;

        const submission: Submission = {
          wardNo: formData.wardNo as string,
          houseNo: formData.houseNo as string,
          residentName: formData.residentName as string,
          mobileNo: formData.mobileNo as string,
          address: formData.address as string,
          households: parseInt(formData.households as string || "0", 10),
          propertyType: formData.propertyType as string,
          waterConnection: JSON.parse(formData.waterConnection as string || "{}"),
          propertyPhoto: propertyPhotoUrl,
          pipelinePhoto: pipelinePhotoUrl,
          waterTaxBill: waterTaxBillUrl,
        };

        const createdSubmission = await prisma.submission.create({
          data: {
            wardNo: submission.wardNo,
            houseNo: submission.houseNo,
            residentName: submission.residentName,
            mobileNo: submission.mobileNo,
            address: submission.address,
            households: submission.households,
            propertyType: submission.propertyType,
            waterConnection: submission.waterConnection.hasWaterConnection ?? true,
            propertyPhoto: submission.propertyPhoto,
            pipelinePhoto: submission.pipelinePhoto,
            waterTaxBill: submission.waterTaxBill,
          },
        });

        res.status(201).json(createdSubmission);
      } catch (error) {
        console.error("Error saving submission:", error);
        res.status(500).json({ error: "Failed to save submission" });
      }
    });

    req.pipe(busboy);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
