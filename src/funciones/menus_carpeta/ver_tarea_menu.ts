import { almacenTareas } from "../../clases/AlmacenTareas";
//@ts-ignore
import * as inquirer from "inquirer";
import { Tarea } from "../../clases/Tarea";
import { limpiarPantalla } from "../funciones_sistema";
import { buscarDificultad, calculoTarea, promEstado, totalTareas } from "../Reportes";



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
                const prioridad=tareasPrioridad(tareas,new Date());
                if(!prioridad|| prioridad.length==0){
                    console.log("Aun No Hay Tareas de Alta Prioridad")
                    return;
                }
                console.table(prioridad);
                break;
            case "3":
                console.log("Total de Taras: ",totalTareas(almacenTareas.getTareas));
                console.log("Tareas Faciles: ",calculoTarea(almacenTareas.getTareas,"Facil").toFixed(3),"%");
                console.log("Tareas Normales: ",calculoTarea(almacenTareas.getTareas,"Normal").toFixed(3),"%");
                console.log("Tareas Dificiles: ",calculoTarea(almacenTareas.getTareas,"Dificil").toFixed(3),"%");
                console.log("-----------------------------------");
                const promedios = promEstado(almacenTareas.getTareas);
                console.log(`Pendiente ${promedios.pendiente.toFixed(3)}% | En Proceso ${promedios.enProceso.toFixed(3)}% | Terminado ${promedios.terminado.toFixed(3)} | Cancelado ${promedios.cancelado.toFixed(2)}% `);
                console.log("-----------------------------------");
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
                  { name: "Ver las Estadisticas de las Tareas  ", value: "3" },
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

function tareasPrioridad(tareasFiltradas:Tarea[], fecha:Date){
   const vencidas = verificarVencimiento(tareasFiltradas, fecha);
  if (vencidas.length > 0) {
    return vencidas;
  }
  const tareasDificiles = buscarDificultad("Dificil",tareasFiltradas);
  if (!tareasDificiles || tareasDificiles.length === 0) {
    return null;
  }
  return tareasDificiles;
}

function verificarVencimiento(tareasFiltradas:Tarea[], fecha:Date){
   return tareasFiltradas.filter(tarea=> new Date(tarea.vencimiento)>fecha)
}