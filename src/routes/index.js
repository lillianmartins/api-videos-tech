import express from "express";
import temas from "./temasRoutes.js";
import categorias from "./categoriasRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("API de vídeos tech com MongoDB")
    });
    
    app.use(
        express.json(), 
        temas,
        categorias
    );
};

export default routes;
