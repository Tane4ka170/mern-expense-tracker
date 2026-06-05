import express from "express";
import authMiddleware from "../middlware/auth.js";
import {
  addIncome,
  deleteIncome,
  downloadIncome,
  getIncome,
  getIncomeOverview,
  updateIncome,
} from "../controllers/incomeController.js";

const incomeRouter = express.Router();

incomeRouter.post("/add", authMiddleware, addIncome);
incomeRouter.get("/get", authMiddleware, getIncome);

incomeRouter.put("/update/:id", authMiddleware, updateIncome);
incomeRouter.get("/downloadexcelsheet", authMiddleware, downloadIncome);

incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
incomeRouter.get("/overview", authMiddleware, getIncomeOverview);

export default incomeRouter;
