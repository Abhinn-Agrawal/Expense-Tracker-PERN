import prisma from "../../prismaClient.js";

export default async function createIncome(req, res) {
  try {
    const { title, amount, date, category, description } = req.body;
    const userId = req.userId;

    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const income = await prisma.income.create({
      data: {
        title,
        amount: Number(amount),
        date: new Date(date),
        category,
        description,
        userId, 
      },
    });

    return res.status(201).json(income);
  } catch (error) {
    console.error("Create income error:", error);
    return res.status(500).json({ error: "Failed to create income" });
  }
}
