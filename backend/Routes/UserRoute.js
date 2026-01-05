import { Router } from "express"
import UserController from "../Controller/UserController.js"

const router = Router();

router.post("/", UserController.postToDo)
router.get("/", UserController.getRegisters)
router.put("/:id", UserController.putRegisters)// tem que criar uma pagina dinamica para alterar cada dado dps
router.delete("/:id", UserController.deletRegister)

export default router