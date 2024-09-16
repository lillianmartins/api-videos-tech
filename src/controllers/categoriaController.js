import NaoEncontrado from "../erros/NaoEncontrado.js";
import { categorias } from "../models/index.js";

class CategoriaController {

    static listarCategorias = async (req, res, next) => {
        try {
            const categoriasResultado = categorias.find();

            req.resultado = categoriasResultado;

            next();
        } catch (erro) {
            next(erro);
        };
    };

    static listarCategoriaPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const categoriaResultado = await categorias.findById(id);

            if (categoriaResultado !== null) {
                res.status(200).json(categoriaResultado);
            } else {
                next(new NaoEncontrado("Id da categoria não localizado."))
            };
        } catch (erro) {
            next(erro);
        };
    };

    static cadastrarCategoria = async (req, res, next) => {
        try {
            let categoria = new categorias(req.body);

            const categoriaResultado = await categoria.save();

            res.status(201).send(categoriaResultado.toJSON());
        } catch (erro) {
            next(erro);
        };
    };

    static atualizarCategoria = async (req, res, next) => {
        try {
            const id = req.params.id;

            const categoriaResultado = await categorias.findByIdAndUpdate(id, { $set: req.body});

            if (categoriaResultado !== null) {
                res.status(200).json({ message: "Categoria atualizada com sucesso." });
            } else {
                next(new NaoEncontrado("Id da categoria não localizado."));
            }
        } catch (erro) {
            next(erro);
        };
    };

    static deletarCategoria = async (req, res, next) => {
        try {
            const id = req.params.id;

            const categoriaResultado = await categorias.findByIdAndDelete(id);

            if (categoriaResultado !== null) {
                res.status(200).json({ message: "Categoria removida com sucesso.", categoria: categoriaResultado });
            } else {
                next(new NaoEncontrado("Id da categoria não localizado."))
            }
        } catch (erro) {
            next(erro);
        };
    };

};

export default CategoriaController;
