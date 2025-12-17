import prisma from "../../prismaClient.js";

export default async function updateExpense(req, res) {
  try {
    const id = Number(req.params.id);
    const userId = req.userId;
    const { title, amount, date, category, description } = req.body;

    const updated = await prisma.expense.updateMany({
      where: { id, userId },
      data: {
        title,
        amount: Number(amount),
        date: new Date(date),
        category,
        description,
      },
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ message: "Expense updated" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update expense" });
  }
}