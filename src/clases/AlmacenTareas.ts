import { Tarea } from "./Tarea"
export class AlmacenTareas {

    public list_tareas:Tarea[];

    constructor(){
        this.list_tareas = [];
    }

    
    verTareas(){
        almacenTareas.list_tareas.forEach(tarea => {if(tarea.papelera===false)
        return tarea
        })
    }

}
export const almacenTareas = new AlmacenTareas();