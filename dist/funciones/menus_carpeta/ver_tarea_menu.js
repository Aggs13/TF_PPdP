"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verTarea = verTarea;
const AlmacenTareas_1 = require("../../clases/AlmacenTareas");
//@ts-ignore
const inquirer = require("inquirer");
async function verTarea() {
    const tareas = AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false);
    console.table(tareas, ["id", "titulo", "estado", "vencimiento"]);
    let opcion = await subMenu();
    if (opcion == "1") {
        const tareaDet = await tareasDetalladas(tareas);
        console.table([tareaDet]);
    }
    return;
}
async function subMenu() {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Que Desea Hacer?",
            choices: [
                { name: "Ver detalladamente una de las tareas  ", value: "1" },
                { name: "Volver       ", value: "0" }
            ]
        }
    ]);
    return opcion;
}
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
