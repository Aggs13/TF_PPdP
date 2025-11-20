import { Tarea } from "./Tarea"
export class AlmacenTareas {

    public list_tareas:Tarea[];

    constructor(){
        this.list_tareas = [];
    }
}
export const almacenTareas = new AlmacenTareas();