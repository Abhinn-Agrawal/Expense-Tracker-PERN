import prisma from "../../prismaClient.js";

export default async function updateIncome(req, res) {
  try {
    const id = Number(req.params.id);
    const userId = req.userId;
    const { title, amount, date, category, description } = req.body;

    const updated = await prisma.income.updateMany({
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
      return res.status(404).json({ message: "Income not found" });
    }

    return res.json({ message: "Income updated" });
  } catch (error) {
    console.error("Update income error:", error);
    return res.status(500).json({ message: "Failed to update income" });
  }
}