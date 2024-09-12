import mongoose from "mongoose";
import temas from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class TemaController {

    static async listarTema(req, res, next) {
        try {
            const buscaTemas = temas.find();

            req.resultado = buscaTemas;

            next();
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Erro interno do servidor.` })
        };
    };

    static async listarTemaPorId(req, res, next) {
        try {
            const id = req.params.id;
            const temaEncontrado = await temas.findById(id);

            if (temaEncontrado !== null) {
                res.status(200).json(temaEncontrado);
            } else {
                next(new NaoEncontrado("Id do tema não localizado."))
            };
        } catch (erro) {
            next(erro);
        };
    };

    static async cadastrarTema(req, res, next) {
        try {
            const novoTema = await temas.create(req.body);
            res.status(202).json({ message: "Tema criado com sucesso.", tema: novoTema });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar tema.` });
        };
    };

    static async atualizarTema(req, res, next) {
        try {
            const id = req.params.id;
            const temaEncontrado = await temas.findByIdAndUpdate(id, req.body);

            if (temaEncontrado !== null) {
                res.status(200).json({ message: "Tema atualizado com sucesso." });
            } else {
                next(new NaoEncontrado("Id do tema não localizado."))
            }
        } catch (erro) {
            next(erro);
        };
    };

    static async deletarTema(req, res, next) {
        try {
            const id = req.params.id;
            const temaEncontrado = await temas.findByIdAndDelete(id);

            if (temaEncontrado !== null) {
                res.status(200).json({ message: "Tema deletado com sucesso.", tema: temaEncontrado });
            } else {
                next(new NaoEncontrado("Id do tema não localizado."))
            }
        } catch (erro) {
            next(erro);
        };
    };

    static async listarTemaPorFiltro(req, res, next) {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const temasResultado = temas.find(busca);

                req.resultado = temasResultado;

                next();
            } else {
                res.status(200).send([]);
            };
        } catch (erro) {
            next(erro);
        };
    };

};

async function processaBusca(parametros) {
    const { titulo, categoria, tags } = parametros;
    const busca = {};

    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if (categoria) busca.categoria = { $regex: categoria, $options: "i" }
    if (tags) busca.tags = { $regex: tags, $options: "i" };

    return busca
};

export default TemaController;
