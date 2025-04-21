import { Submission } from "@/types/submission";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      wardNo,
      houseNo,
      residentName,
      mobileNo,
      address,
      households,
      propertyType,
      waterConnection,
      propertyPhoto,
      pipelinePhoto,
      waterTaxBill,
    }: Submission = req.body;

    try {
      const submission = await prisma.submission.create({
        data: {
          wardNo,
          houseNo,
          residentName,
          mobileNo,
          address,
          households: households || 0,
          propertyType,
          waterConnection: JSON.parse(waterConnection as unknown as string),
          propertyPhoto: propertyPhoto || null,
          pipelinePhoto: pipelinePhoto || null,
          waterTaxBill: waterTaxBill || null,
        },
      });

      res.status(201).json(submission);
    } catch (error) {
      console.error("Error saving submission:", error);
      res.status(500).json({ error: "Failed to save submission" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
