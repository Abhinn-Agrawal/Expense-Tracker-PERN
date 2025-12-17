import prisma from "../../prismaClient.js";

export default async function getAllIncomes(req, res) {
  try {
    const userId = req.userId;

    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return res.json(incomes);
  } catch (error) {
    console.error("Fetch incomes error:", error);
    return res.status(500).json({ message: "Failed to fetch incomes" });
  }
}
