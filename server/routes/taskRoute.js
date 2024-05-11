import express from "express";
import { Create, allTasks, completeTasks, deleteTasks, importantTasks, incompleteTasks, updateCompleteTasks, updateImportantTasks, updateTasks } from "../controller/TaskController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, Create);
router.route("/allTasks").get(isAuthenticated, allTasks);
router.route("/deleteTasks/:id").delete(isAuthenticated, deleteTasks);
router.route("/updateTasks/:id").put(isAuthenticated, updateTasks);
router.route("/updateImportantTasks/:id").put(isAuthenticated, updateImportantTasks);
router.route("/updateCompleteTasks/:id").put(isAuthenticated, updateCompleteTasks);
router.route("/importantTasks").get(isAuthenticated, importantTasks);
router.route("/completeTasks").get(isAuthenticated, completeTasks);
router.route("/incompleteTasks").get(isAuthenticated, incompleteTasks);

export default router;