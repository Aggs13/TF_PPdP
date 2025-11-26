"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuVerTarea = menuVerTarea;
const AlmacenTareas_1 = require("../../clases/AlmacenTareas");
//@ts-ignore
const inquirer = require("inquirer");
const funciones_sistema_1 = require("../funciones_sistema");
const Reportes_1 = require("../Reportes");
async function menuVerTarea() {
    const tareas = AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false);
    console.table(tareas, ["id", "titulo", "estado", "vencimiento"]);
    let opcion;
    do {
        opcion = await subMenu();
        switch (opcion) {
            case "1":
                const tareaDet = await tareasDetalladas(tareas);
                (0, funciones_sistema_1.limpiarPantalla)();
                console.table([tareaDet]);
                break;
            case "2":
                (0, funciones_sistema_1.limpiarPantalla)();
                const prioridad = tareasPrioridad(tareas, new Date());
                if (!prioridad || prioridad.length == 0) {
                    console.log("Aun No Hay Tareas de Alta Prioridad");
                    return;
                }
                console.table(prioridad);
                break;
            case "3":
                console.log("Total de Taras: ", (0, Reportes_1.totalTareas)(AlmacenTareas_1.almacenTareas.getTareas));
                console.log("Tareas Faciles: ", (0, Reportes_1.calculoTarea)(AlmacenTareas_1.almacenTareas.getTareas, "Facil").toFixed(3), "%");
                console.log("Tareas Normales: ", (0, Reportes_1.calculoTarea)(AlmacenTareas_1.almacenTareas.getTareas, "Normal").toFixed(3), "%");
                console.log("Tareas Dificiles: ", (0, Reportes_1.calculoTarea)(AlmacenTareas_1.almacenTareas.getTareas, "Dificil").toFixed(3), "%");
                console.log("-----------------------------------");
                const promedios = (0, Reportes_1.promEstado)(AlmacenTareas_1.almacenTareas.getTareas);
                console.log(`Pendiente ${promedios.pendiente.toFixed(3)}% | En Proceso ${promedios.enProceso.toFixed(3)}% | Terminado ${promedios.terminado.toFixed(3)} | Cancelado ${promedios.cancelado.toFixed(2)}% `);
                console.log("-----------------------------------");
                break;
            default:
                console.log("Volviendo...");
                break;
        }
    } while (opcion != "0");
}
//Sub Menu
async function subMenu() {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Que Desea Hacer?",
            choices: [
                { name: "Ver Detalladamente una de las Tareas  ", value: "1" },
                { name: "Ver Tareas de Prioridad Alta  ", value: "2" },
                { name: "Ver las Estadisticas de las Tareas  ", value: "3" },
                { name: "Volver       ", value: "0" }
            ]
        }
    ]);
    return opcion;
}
//Tareas Detalladas
async function tareasDetalladas(tareasFiltradas) {
    const tarea = await menuDatalladas(tareasFiltradas);
    return tarea;
}
async function menuDatalladas(tareasFiltradas) {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige una Tarea",
            choices: tareasFiltradas.map((tarea) => ({
                name: `ID ${tarea.id} | ${tarea.titulo} | ${tarea.estado}`,
                value: tarea
            }))
        }
    ]);
    return opcion;
}
//Tareas Prioridad
function tareasPrioridad(tareasFiltradas, fecha) {
    const vencidas = verificarVencimiento(tareasFiltradas, fecha);
    if (vencidas.length > 0) {
        return vencidas;
    }
    const tareasDificiles = (0, Reportes_1.buscarDificultad)("Dificil", tareasFiltradas);
    if (!tareasDificiles || tareasDificiles.length === 0) {
        return null;
    }
    return tareasDificiles;
}
function verificarVencimiento(tareasFiltradas, fecha) {
    return tareasFiltradas.filter(tarea => new Date(tarea.vencimiento) > fecha);
}
