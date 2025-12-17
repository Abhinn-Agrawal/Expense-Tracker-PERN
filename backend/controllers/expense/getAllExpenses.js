import prisma from "../../prismaClient.js";

export default async function(req, res){
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: "desc" },
    });

    return res.json(expenses);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
