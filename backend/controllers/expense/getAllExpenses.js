import prisma from "../../prismaClient.js";

export default async function getAllExpenses(req, res) {
  try {
    const userId = req.userId;

    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return res.json(expenses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch expenses" });
  }
}
