import prisma from "../../prismaClient.js";

export default async function deleteExpense(req, res) {
  try {
    const id = Number(req.params.id);
    const userId = req.userId;

    await prisma.expense.deleteMany({
      where: { id, userId },
    });

    return res.json({ message: "Expense deleted" });
  } catch (err) {
    return res.status(404).json({ message: "Expense not found" });
  }
}
