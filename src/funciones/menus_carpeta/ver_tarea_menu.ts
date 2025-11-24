import { almacenTareas } from "../../clases/AlmacenTareas";
//@ts-ignore
import * as inquirer from "inquirer";
import { Tarea } from "../../clases/Tarea";
import { buscarDificultad } from "../Reportes";
import { limpiarPantalla } from "../funciones_sistema";



export async function menuVerTarea(){
    const tareas = almacenTareas.getTareas.filter(t => t.papelera == false);
    console.table(tareas,["id", "titulo", "estado", "vencimiento"]);
    let opcion: string
    do{
        opcion = await subMenu();
        switch(opcion){
            case "1":
                const tareaDet = await tareasDetalladas(tareas)
                limpiarPantalla()
                console.table([tareaDet]);
            break;

            case "2":
                limpiarPantalla()
                const prioridad=tareasPrioridad(tareas);
                if(!prioridad|| prioridad.length==0){
                    console.log("Aun No Hay Tareas de Alta Prioridad")
                    return;
                }
                console.table(prioridad);
            break;

            default:
                console.log("Volviendo...");
            break
    }
}while(opcion != "0")
}

//Sub Menu
async function subMenu(){
    const {opcion} = await inquirer.prompt([
    {
        type: "list",
        name: "opcion",
        message: "> Que Desea Hacer?",
        choices: [
        { name: "Ver Detalladamente una de las Tareas  ", value: "1" },
        { name: "Ver Tareas de Prioridad Alta  ", value: "2" },
        { name: "Volver       ", value: "0"}
        ]
    }
    ]);
    
    return opcion;
}
//Tareas Detalladas
async function tareasDetalladas(tareasFiltradas: Tarea[]) {
    const tarea=await menuDatalladas(tareasFiltradas)
    return tarea;
}

async function menuDatalladas(tareasFiltradas:Tarea[]) {
    const{opcion}= await inquirer.prompt([
        {
            type:"list",
            name:"opcion",
            message:"> Elige una Tarea",
            choices:tareasFiltradas.map((tarea)=>({
                name: `ID ${tarea.id} | ${tarea.titulo} | ${tarea.estado}`,
                value: tarea 
            }))
        }
    ]);
    return opcion;
    
}

//Tareas Prioridad
function tareasPrioridad(tareasFiltradas:Tarea[]){
   const vencidas = verificarVencimiento(tareasFiltradas, new Date());

  if (vencidas.length > 0) {
    return vencidas;
  }

  const tareasDificiles = buscarDificultad("Dificil");

  if (!tareasDificiles || tareasDificiles.length === 0) {
    return null;
  }

  return tareasDificiles;
}
function verificarVencimiento(tareasFiltradas:Tarea[], fecha:Date){
   return tareasFiltradas.filter(tarea=> new Date(tarea.vencimiento)>fecha)
}