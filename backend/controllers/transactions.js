import prisma from "../prismaClient.js";

export default async function getAllTransactions(req, res) {
  const userId = req.userId;

  const [incomes, expenses] = await Promise.all([
    prisma.income.findMany({ where: { userId } }),
    prisma.expense.findMany({ where: { userId } }),
  ]);

  const transactions = [
    ...incomes.map((i) => ({ ...i, type: "income" })),
    ...expenses.map((e) => ({ ...e, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  res.json(transactions);
}