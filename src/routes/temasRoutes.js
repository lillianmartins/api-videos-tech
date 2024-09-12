import express from "express";
import TemaController from "../controllers/temaController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router.get("/temas", TemaController.listarTema, paginar);
router.get("/temas/busca", TemaController.listarTemaPorFiltro, paginar);
router.get("/temas/:id", TemaController.listarTemaPorId);
router.post("/temas", TemaController.cadastrarTema);
router.put("/temas/:id", TemaController.atualizarTema);
router.delete("/temas/:id", TemaController.deletarTema);

export default router;
