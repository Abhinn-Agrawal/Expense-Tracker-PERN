import prisma from "../../prismaClient.js";

export default async function deleteIncome(req, res) {
  try {
    const { id } = req.params;

    await prisma.income.delete({
      where: { id: Number(id) },
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Delete income error:", error);
    return res.status(500).json({ error: "Failed to delete income" });
  }
};
