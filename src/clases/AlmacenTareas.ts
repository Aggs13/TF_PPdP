import { Tarea } from "./Tarea"
export class AlmacenTareas {

    public list_tareas?:Tarea[];

    constructor() {};

  
}


export const almacenTareas = new AlmacenTareas();
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

    public set setTareas(t: Tarea[]){
        this.list_tareas = t
    }

}

export const almacenTareas = new AlmacenTareas;
