import prisma from "../../prismaClient.js";

export default async function deleteIncome(req, res) {
  try {
    const id = Number(req.params.id);
    const userId = req.userId;

    const deleted = await prisma.income.deleteMany({
      where: { id, userId },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.json({ message: "Income deleted" });
  } catch (error) {
    console.error("Delete income error:", error);
    return res.status(500).json({ message: "Failed to delete income" });
  }
}