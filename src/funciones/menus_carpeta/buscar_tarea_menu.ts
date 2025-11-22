 
import path = require("path");
// @ts-ignore
import * as inquirer from "inquirer";

import { buscarTareaTitulo, buscarDificultad, buscarEstado, buscarID } from "../Reportes";
const listaDificultades: string[] = ["Facil", "Medio", "Dificil"];
const listaEstados: string[] = ["Pendiente", "En Curso", "Terminada", "Cancelada"];

// @ts-ignore
import * as promptSync from "prompt-sync";
import { limpiarPantalla } from "../funciones_sistema";
 const prompt = promptSync();
 
 
 export async function buscarTarea(){
        
        let opcionBusqueda: string; 
        do{
            opcionBusqueda= await menuBuscarTarea();
            switch(opcionBusqueda.trim()){
                case "1":
                    limpiarPantalla();
                    const titulo= prompt("Ingrese el título o parte del titulo de la tarea a buscar: ")
                    if(!titulo)return "0";
                    buscarTareaTitulo(titulo).length>0?console.table(buscarTareaTitulo(titulo)):console.log("❌❌ No se encontraron tareas con ese titulo ❌❌");
                    break;
                case "2":
                    limpiarPantalla();
                    const id  = prompt("Ingrese el ID de la tarea a buscar: ")
                    if(!id) return "0";
                    buscarID(id).length>0?console.table(buscarID(id)):console.log("❌❌ No se encontraron tareas con ese ID ❌❌");
                    break;
                case "3":
                    limpiarPantalla();
                    let opEstado:string=await menuEstado();
                    buscarEstado(opEstado).length>0?console.table(buscarEstado(opEstado)):console.log("❌❌ No hay tareas con ese Estado aun ❌❌");
                    break;
                case "4":
                    limpiarPantalla();
                    let opDificultad:string= await menuDificultad();
                    buscarDificultad(opDificultad).length>0?console.table(buscarDificultad(opDificultad)):console.log("❌❌ No hay tareas con esa Dificultad aun ❌❌");
                    break;
                case "0":
                    return;
                default:
                    limpiarPantalla();
                    console.log("❌❌ Opción inválida ❌❌");
                    return;
            }
        }while(opcionBusqueda != "0")
    }
//Menu Buscar Tareas
    async function menuBuscarTarea(){
          const {opcion} = await inquirer.prompt([
            {
              type: "list",
              name: "opcion",
              message: "> Elige una opción:",
              choices: [
              { name: "Buscar por Titulo  ", value: "1" },
              { name: "Buscar por ID ", value: "2" },
              { name: "Buscar por Estado   ", value: "3" },
              { name: "Buscar por Dificultad     ", value: "4" },
              { name: "Volver       ", value: "0"}
              ]
            }
          ]);
          return opcion;
    }
//Menu Estado
    async function menuEstado() {
        const{opcion}= await inquirer.prompt([
            {
                type:"list",
                name:"opcion",
                message:"> Elige un Estado",
                choices:listaEstados.map((estado,i)=>({
                    name: estado,
                    value: estado 
                }))
            }
        ]);
        return opcion;
    }


//Menu Didicultad
    async function menuDificultad(){
        const{opcion}= await inquirer.prompt([
            {
                type:"list",
                name:"opcion",
                message:"> Elige una Dificultad",
                choices:listaDificultades.map((dificultad,i)=>({
                    name:dificultad,
                    value: dificultad
                }))

        }]);
        return opcion
    }
