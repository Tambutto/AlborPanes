import mongoose, { Schema, Document } from "mongoose";

export interface IPedidos extends Document {
    cliente: string;
    panes: { nombre: string; cantidad: number }[];
    total: number;
    fecha: Date;
}

const pedidoSchema = new Schema<IPedidos>(
    {
        cliente: { type: String, required: true },
        panes: [
    {
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true }
    }
  ],
        
        total: { type: Number, required: true },
        fecha: { type: Date, default: Date.now }
    }
);

export default mongoose.model<IPedidos>("Pedido", pedidoSchema);