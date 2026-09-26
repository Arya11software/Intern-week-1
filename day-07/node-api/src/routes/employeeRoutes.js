import { Router } from "express";
import { employeeController } from "../controllers/employeeController.js";
import { validateEmployee, validateEmployeeId } from "../middleware/validation.js";

const router = Router();

router.get("/", employeeController.getAll);
router.get("/:id", validateEmployeeId, employeeController.getById);
router.post("/", validateEmployee, employeeController.create);
router.put("/:id", validateEmployeeId, validateEmployee, employeeController.update);
router.delete("/:id", validateEmployeeId, employeeController.delete);

export default router;