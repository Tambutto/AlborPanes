import mongoose , { Schema, Document } from "mongoose";

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    rol: string;
}
const usuarioSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const Usuario =  mongoose.model<IUsuario>('Usuario', usuarioSchema);

export default Usuario;