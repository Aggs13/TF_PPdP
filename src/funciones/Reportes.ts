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


export function agregarTareaArray(newTarea:Tarea,lista:Tarea[]){
    return [...lista, newTarea];
}
// Mover a la papelera
export function moverPapelera(id:string,tareas:Tarea[]){

    const idNum = parseInt(id);
    const tareaExiste = tareas.some(t => t.id == idNum) 
    
    if(!tareaExiste) return null

    return tareas.map(t => {
       return t.id == parseInt(id) ? {...t, papelera:true} : t
    })
}

// Quitar de papelera
export function quitarPapelera(id:string,tareas:Tarea[]){
    const idNum = parseInt(id);
    const tareaExiste = tareas.some(t => t.id == idNum) 

    if(!tareaExiste) return null

    return tareas.map(t => {
       return t.id == idNum ? {...t, papelera:false} : t
    })
}


// vaciar papelera 
export function vaciarPapelera(tareas:Tarea[]){
    const nuevo_array = tareas.filter(t => t.papelera == false);
    return nuevo_array;
}

//Buscar Tarea
    //Buscar por Titulo
    export function buscarTareaTitulo(titulo: String){
        return almacenTareas.getTareas.filter(t => t.papelera == false && t.titulo.toLowerCase().includes(titulo.toLowerCase()))
    }
    //Buscar por ID
    export function buscarID(id:number){
        
        return almacenTareas.getTareas.filter(t=> t.id == id)
    }
    //Buscar por Estado
    export function buscarEstado(estado: string){
        return almacenTareas.getTareas.filter(t => t.estado === estado)
    }
    //Buscar por Dificultad
    export function buscarDificultad(dificultad:string){
        return almacenTareas.getTareas.filter(t=> t.dificultad=== dificultad)
    }



// Editar Tarea

export function selccionarConicidencia(coincidencias:Tarea[],id:number){
  return coincidencias.filter(t => t.id == id)[0]
}

export function crearCambios(tareaAeditar:Tarea,datos:Partial<Tarea>){
  return{...tareaAeditar,...datos}
}