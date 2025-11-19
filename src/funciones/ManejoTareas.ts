// Solo van funciones puras en este archivo
import path = require("path");
import { Tarea } from "../clases/Tarea";
// leer archivo donde van las tareas



export function nuevaTarea(id:number,titulo: string,descripcion: string, estado: string , creacion: string, ultimaEdicion: string, vencimiento: string ,dificultad: string){
   const tarea = new Tarea(id,titulo,descripcion,estado,creacion,ultimaEdicion,vencimiento,dificultad);
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


export function agregarTareaArray(newTarea:Tarea,lista:Tarea[]){
    return [...lista, newTarea];
}