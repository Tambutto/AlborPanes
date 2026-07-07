import { Request, Response } from 'express';
import Pan from '../models/panes';

interface PanesController {
  getPanes: (req: Request, res: Response) => Promise<void>;
  getPanById: (req: Request, res: Response) =>Promise<void>;
  createPan: (req: Request, res: Response) => Promise<void>;
  updatePan: (req: Request, res: Response) => Promise<void>;
  deletePan: (req: Request, res: Response) => Promise<void>;
}

const panesController: PanesController = {
    // Obtener todos los panes
    getPanes: async (req: Request, res: Response) => {
        try {
            const panes = await Pan.find();
            res.json(panes);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al obtener los panes' });
        }
        },
    // Obtener un pan por ID
    getPanById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const pan = await Pan.findById(id);
            if (pan) {
                res.json(pan)
             } else {
                res.status(404).json({ error: 'Pan no encontrado' });
            }
        } catch (error: any) {
                res.status(500).json({ error: 'Error al obtener el pan' });
            }
        },
    
    // Crear un nuevo pan
    createPan: async (req: Request, res: Response) => {
        try {
            const nuevoPan = new Pan(req.body);
            const savedPan = await nuevoPan.save();
            res.status(201).json(savedPan);
         } catch (error: any) {
            res.status(500).json({ error: error.message });
         } 
        },

    // Actualizar un pan existente
    updatePan: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const updatedPan = await Pan.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedPan) {
                res.json(updatedPan);
             } else {
                res.status(404).json({ error: 'Pan no encontrado' });
            }
        } catch (error: any) {res.status(500).json({ error: 'Error al actualizar el pan' });
        }
    },

    // Eliminar un pan
    deletePan: async (req: Request, res: Response) => {
        try {   
             const id = req.params.id;
            const deletedPan = await Pan.findByIdAndDelete(id);
            if (deletedPan) {
                res.json({ message: 'Pan eliminado correctamente' });
             } else {
                res.status(404).json({ error: 'Pan no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ error: 'Error al eliminar el pan' });
        }
    }
    }


export default panesController;
