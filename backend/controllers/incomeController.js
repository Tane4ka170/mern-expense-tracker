import incomeModel from "../models/incomeModel.js";

// Add income
export async function addIncome(req, res) {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newIncome = new incomeModel({});
  } catch (error) {}
}
