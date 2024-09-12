import express from "express";
import temas from "./temasRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("API de vídeos tech com MongoDB")
    });
    
    app.use(express.json(), temas);
};

export default routes;
