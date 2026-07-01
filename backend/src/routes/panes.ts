import { Router } from "express";
import panesController from "../controllers/panes.controller";

const router = Router();

// Ruta raiz
router.get("/", panesController.getPanes);
router.get("/:id", panesController.getPanById);
router.post("/", panesController.createPan);
router.put("/:id", panesController.updatePan);
router.delete("/:id", panesController.deletePan);

// router.get("/:id", (req, res) => {
//     const id = req.params.id;
//     res.send(`Has solicitado el pan con id: ${id}`);
// //     return res.send(`Has solicitado el pan con id: ${req.params.id}`); // Otra forma de hacerlo
//  })

export default router;