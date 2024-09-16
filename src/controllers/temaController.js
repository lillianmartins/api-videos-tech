import NaoEncontrado from "../erros/NaoEncontrado.js";
import { categorias, temas } from "../models/index.js";

class TemaController {

    static listarTema = async (req, res, next) => {
        try {
            const buscaTemas = temas.find();

            req.resultado = buscaTemas;

            next();
        } catch (erro) {
            next(erro);
        };
    };

    static listarTemaPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const temaResultado = await temas.findById(id)
                .populate("categoria")
                .exec();

            if (temaResultado !== null) {
                res.status(200).json(temaResultado);
            } else {
                next(new NaoEncontrado("Id do tema não localizado."))
            };
        } catch (erro) {
            next(erro);
        };
    };

    static cadastrarTema = async (req, res, next) => {
        try {
            let novoTema = new temas(req.body);

            const temaResultado = await temas.save();
            
            res.status(201).send(temaResultado.toJSON());
        } catch (erro) {
            next(erro);
        };
    };

    static atualizarTema = async (req, res, next) => {
        try {
            const id = req.params.id;

            const temaResultado = await temas.findByIdAndUpdate(id, {$set: req.body});

            if (temaResultado !== null) {
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

            const temaResultado = await temas.findByIdAndDelete(id);

            if (temaResultado !== null) {
                res.status(200).json({ message: "Tema deletado com sucesso.", tema: temaResultado });
            } else {
                next(new NaoEncontrado("Id do tema não localizado."));
            }
        } catch (erro) {
            next(erro);
        };
    };

    static listarTemaPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const temasResultado = temas.find(busca)
                    .populate("categoria");

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
    const { titulo, tags, categoria } = parametros;
    const busca = {};

    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if (tags) busca.tags = { $regex: tags, $options: "i" };

    if (categoria) {
        const categoria = await categorias.findOne({ categoria: categoria });

        if (categoria !== null) {
            busca.categoria = categoria._id;
        } else {
            busca = null;
        };
    };

    return busca;
};

export default TemaController;
