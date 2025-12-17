import prisma from "../prismaClient.js";

export default async function getAlltransaction(req, res){
  const [incomes, expenses] = await Promise.all([
    prisma.income.findMany(),
    prisma.expense.findMany(),
  ]);

  const transactions = [
    ...incomes.map((i) => ({ ...i, type: "income" })),
    ...expenses.map((e) => ({ ...e, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return res.json(transactions);
};
