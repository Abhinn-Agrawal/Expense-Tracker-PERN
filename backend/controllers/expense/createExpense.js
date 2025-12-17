import prisma from "../../prismaClient.js";

export default async function createExpense(req, res) {
  try {
    const { title, amount, date, category, description } = req.body;

    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
        date: new Date(date),
        category,
        description,
      },
    });

    return res.status(201).json({ message: "Expense created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
