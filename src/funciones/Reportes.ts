// Solo van funciones puras en este archivo
import path = require("path");
import { Tarea } from "../clases/Tarea";
import { almacenTareas } from "../clases/AlmacenTareas";


export function nuevaTarea(id:number,titulo: string,descripcion: string, estado: string , creacion: string, ultimaEdicion: string, vencimiento: string ,dificultad: string,papelera:boolean){
   const tarea = new Tarea(id,titulo,descripcion,estado,creacion,ultimaEdicion,vencimiento,dificultad,papelera);
   return tarea;
}

export function validarDificultad(dificultadOpcion:string){

    const dificultades = ["Facil","Normal","Dificil"];
    const dificultadSelect:number = parseInt(dificultadOpcion);
    return dificultades[dificultadSelect-1];

}

export function validarEstado(estadoOpcion:string){
    const estados = ["Pendiente","En Proceso", "Terminado", "Cancelado"]
    const estadoSelect = parseInt(estadoOpcion);
    return estados[estadoSelect-1];
}


export function establecerVencimiento(dias:string,fecha:Date){
    
    let diasVencimiento:number = parseInt(dias);
    const fechaVencimiento = new Date(fecha.getTime());
    fechaVencimiento.setDate(fechaVencimiento.getDate() + diasVencimiento);
    return fechaVencimiento.toLocaleDateString("es-AR");
}


// Mover a la papelera
export function moverPapelera(id:string,tareas:Tarea[]){
    return tareas.map(t => {
       return t.id == parseInt(id) ? {...t, papelera:true} : t
    })
}

// Quitar de papelera
export function quitarPapelera(id:string,tareas:Tarea[]){
    return tareas.map(t => {
       return t.id == parseInt(id) ? {...t, papelera:false} : t
    })
}

// condicion ? valor_si_true : valor_si_false