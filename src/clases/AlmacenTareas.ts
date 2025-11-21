import { Tarea } from "./Tarea"
export class AlmacenTareas {

    private list_tareas:Tarea[];

    constructor(){
        this.list_tareas = [];
    }

    public get getTareas():Tarea[]{
        return this.list_tareas
    }

    public agregar(t: Tarea){
        this.list_tareas.push(t);
    }

}

export const almacenTareas = new AlmacenTareas;
