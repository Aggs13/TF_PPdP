"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limpiarPantalla = limpiarPantalla;
exports.obtener_path = obtener_path;
exports.path_txt = path_txt;
exports.cargarTareas = cargarTareas;
exports.menuSelectTarea = menuSelectTarea;
const path = require("path");
const AlmacenTareas_1 = require("../clases/AlmacenTareas");
const fs = require("fs");
//@ts-ignore
const inquirer = require("inquirer");
function limpiarPantalla() {
    process.stdout.write('\x1Bc');
}
function obtener_path() {
    const txt = path.join(__dirname);
    const txt_path = path_txt(txt);
    return txt_path;
}
function path_txt(txt_path) {
    const texto = path.join(txt_path, "../../archivo_Tareas.txt");
    return texto;
}
function cargarTareas() {
    const cargadas = JSON.parse(fs.readFileSync(obtener_path(), "utf-8"));
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
                    name: `ID ${t.id} | ${t.titulo} | ${t.estado}`, value: t
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
