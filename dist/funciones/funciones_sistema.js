"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limpiarPantalla = limpiarPantalla;
exports.obtenerPathArchivo = obtenerPathArchivo;
exports.cargarTareas = cargarTareas;
exports.menuSelectTarea = menuSelectTarea;
const path = require("path");
const AlmacenTareas_1 = require("../clases/AlmacenTareas");
const fs = require("fs");
//@ts-ignore
const inquirer = require("inquirer");
// limpia pantalla
function limpiarPantalla() {
    process.stdout.write('\x1Bc');
}
// obtiene la ubicacion del archivo
function obtenerPathArchivo() {
    return path.join(__dirname, "../../archivo_Tareas.txt");
}
function cargarTareas() {
    const cargadas = JSON.parse(fs.readFileSync(obtenerPathArchivo(), "utf-8"));
    for (const t of cargadas) {
        AlmacenTareas_1.almacenTareas.agregar(t);
    }
}
async function menuSelectTarea(tareas, papelera) {
    const opcionesTareas = tareas.filter(t => t.papelera === papelera);
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige una Tarea",
            choices: [
                ...opcionesTareas.map((t) => ({
                    name: `ID ${t.id} | ${t.titulo} | ${t.estado} | ${t.dificultad}`, value: t
                })),
                { name: "Cancelar", value: -1 }
            ]
        }
    ]);
    if (opcion == -1)
        return;
    let tareaSelect = opcion;
    return tareaSelect;
}
