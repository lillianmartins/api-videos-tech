import express from "express";
import TemaController from "../controllers/temaController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/temas", TemaController.listarTema, paginar)
  .get("/temas/busca", TemaController.listarTemaPorFiltro, paginar)
  .get("/temas/:id", TemaController.listarTemaPorId)
  .post("/temas", TemaController.cadastrarTema)
  .put("/temas/:id", TemaController.atualizarTema)
  .delete("/temas/:id", TemaController.deletarTema)

export default router;
