import { almacenTareas } from "../../clases/AlmacenTareas";
//@ts-ignore
import * as inquirer from "inquirer";
import { Tarea } from "../../clases/Tarea";


export async function verTarea(){
    const tareas = almacenTareas.getTareas.filter(t => t.papelera == false);
    console.table(tareas,["id", "titulo", "estado", "vencimiento"]);
    let opcion: string = await subMenu();
    if (opcion=="1") {
        const tareaDet = await tareasDetalladas(tareas)
        console.table([tareaDet]);
    }
    return;

}

async function subMenu(){
              const {opcion} = await inquirer.prompt([
                {
                  type: "list",
                  name: "opcion",
                  message: "> Que Desea Hacer?",
                  choices: [
                  { name: "Ver detalladamente una de las tareas  ", value: "1" },
                  { name: "Volver       ", value: "0"}
                  ]
                }
              ]);
              
              return opcion;
}

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