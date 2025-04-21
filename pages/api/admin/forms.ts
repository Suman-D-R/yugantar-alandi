import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { page = 1, limit = 10, search = "", sortField = "createdAt", sortOrder = "desc" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    try {
      const where = search
        ? {
            OR: [
              { wardNo: { contains: search as string, mode: "insensitive" } },
              { houseNo: { contains: search as string, mode: "insensitive" } },
              { residentName: { contains: search as string, mode: "insensitive" } },
              { mobileNo: { contains: search as string, mode: "insensitive" } },
              { address: { contains: search as string, mode: "insensitive" } },
            ],
          }
        : {};

      const forms = await prisma.property.findMany({
        where,
        skip,
        take,
        orderBy: { [sortField as string]: sortOrder as "asc" | "desc" },
      });

      const total = await prisma.property.count({ where });

      res.status(200).json({ forms, total });
    } catch {
      res.status(500).json({ error: "Failed to retrieve forms data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
