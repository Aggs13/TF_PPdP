import { Tarea } from "./Tarea"
export class AlmacenTareas {

    public list_tareas:Tarea[];

    constructor(){
        this.list_tareas = [];
    }
}

const almacenTareas = new AlmacenTareas;
export let array_tareas = almacenTareas.list_tareas;