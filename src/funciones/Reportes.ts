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
export function moverPapelera(tarea:Tarea,tareas:Tarea[]){
    const id:number = tarea.id
    return tareas.map(t => {
       return t.id == id ? {...t, papelera:true} : t
    })
}

// Quitar de papelera
export function quitarPapelera(tareaSelect:Tarea,tareas:Tarea[]){

    const idNum:number = tareaSelect.id
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
    export function buscarTareaTitulo(titulo: String,arrayTareas:Tarea[]){
        return arrayTareas.filter(t => t.papelera == false && t.titulo.toLowerCase().includes(titulo.toLowerCase()))
    }
    //Buscar por ID
    export function buscarID(id:number,arrayTareas:Tarea[]){
        
        return arrayTareas.filter(t=> t.id == id)
    }
    //Buscar por Estado
    export function buscarEstado(estado: string,arrayTareas:Tarea[]){
        return arrayTareas.filter(t => t.estado === estado)
    }
    //Buscar por Dificultad
    export function buscarDificultad(dificultad:string,arrayTareas:Tarea[]){
        return arrayTareas.filter(t=> t.dificultad=== dificultad)
    }



// Editar Tarea
export function selccionarConicidencia(coincidencias:Tarea[],id:number){
  return coincidencias.filter(t => t.id == id)[0]
}

export function crearCambios(tareaAeditar:Tarea,datos:Partial<Tarea>){
  return{...tareaAeditar,...datos}
}


// ESTADISTICAS

// promedio estados 
export function promEstado(tareas:Tarea[]){

    

    const pendiente:number =( tareas.filter(t => t.estado == "Pendiente").filter(t => t.papelera == false).length * 100)/ tareas.filter(t => t.papelera == false).length
    const enProceso:number =(tareas.filter(t => t.estado == "En Proceso").filter(t => t.papelera == false).length * 100) / tareas.filter(t => t.papelera == false).length
    const terminado:number =(tareas.filter(t => t.estado == "Terminado").filter(t => t.papelera == false).length * 100) / tareas.filter(t => t.papelera == false).length
    const cancelado:number =(tareas.filter(t => t.estado == "Cancelado").filter(t => t.papelera == false).length * 100) / tareas.filter(t => t.papelera == false).length

    return{pendiente,enProceso,terminado,cancelado}

}



export function establecerFechaEdicion(fecha:Date){
    const fechaEdicion = new Date(fecha.getTime());
    return fechaEdicion.toLocaleDateString("es-AR");
}
//porcentaje/Cantidad tareas
    export function totalTareas(tareas: Tarea[]){
        return tareas.length
    }
    export function cantidadDificultad(tareas:Tarea[],dificultad:string){
        return tareas.filter(tarea=> tarea.dificultad === dificultad).length
    }
    export function calculoTarea(tareas:Tarea[],dificultad:string){
        const total:number= totalTareas(tareas);
        const calculoDIf:number=cantidadDificultad(tareas,dificultad)
        return (calculoDIf*100)/total;
    }
