import mongoose from "mongoose";

const temaSchema = new mongoose.Schema({
    id: { type: mongoose.Types.ObjectId },
    titulo: {
        type: String,
        required: [true, "O título do tema é obrigatório."]
    },
    linkTexto: { 
        type: String, 
        required: [true, "Link de texto obrigatório."]},
    descricao: { 
        type: String,
        required: [true, "A descrição do tema é obrigatório."]
     },
    linkVideo: {
        type: String,
        require: [true, "Link de vídeo obrigatório."]
    },
    categoria: { 
        type: String,
        required: [true, "A categoria do tema é obrigatório."]
     },
    tags: { 
        type: String,
        required: [true, "A(s) tag(s) do tema é obrigatório."]
     }
}, { versionKey: false });

const tema = mongoose.model("temas", temaSchema);

export default tema;
