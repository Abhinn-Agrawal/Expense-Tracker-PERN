import prisma from "../../prismaClient.js";

export default async function getAllIncomes(req, res) {
  try {
    const incomes = await prisma.income.findMany({
      orderBy: { date: "desc" },
    });

    return res.status(200).json(incomes);
  } catch (error) {
    console.error("Fetch incomes error:", error);
    return res.status(500).json({ error: "Failed to fetch incomes" });
  }
};
