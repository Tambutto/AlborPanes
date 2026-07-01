import mongoose, { Schema, Document } from "mongoose";

export interface IPanes extends Document {
    nombre: string;
    precio: number;
    stock: number;
    
}

const panSchema = new Schema<IPanes>({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 }
});

export default mongoose.model<IPanes>("Pan", panSchema);
