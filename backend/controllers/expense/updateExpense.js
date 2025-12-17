import prisma from "../../prismaClient.js";

export default async function updateExpense(req, res){
  try {
    const id = Number(req.params.id);
    const { title, amount, date, category, description } = req.body;

    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: {
        title,
        amount: amount !== undefined ? Number(amount) : undefined,
        date: date ? new Date(date) : undefined,
        category,
        description,
      },
    });

    return res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Update expense error:", error);

    return res.status(404).json({
      message: "Expense not found or update failed",
    });
  }
};