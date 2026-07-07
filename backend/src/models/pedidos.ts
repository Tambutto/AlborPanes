import mongoose, { Schema, Document } from "mongoose";

export interface IPedidos extends Document {
    usuario: mongoose.Types.ObjectId;
    panes: mongoose.Types.ObjectId[];
    total: number;
    fecha: Date;
}

const pedidoSchema = new Schema<IPedidos>(
    {
        usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
        panes: [{ type: Schema.Types.ObjectId, ref: "Pan", required:true }],        
        total: { type: Number, required: true },
        fecha: { type: Date, default: Date.now }
    }
);

export default mongoose.model<IPedidos>("Pedido", pedidoSchema);