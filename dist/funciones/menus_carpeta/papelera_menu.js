"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuPapelera = menuPapelera;
exports.menuMoverAPalera = menuMoverAPalera;
const AlmacenTareas_1 = require("../../clases/AlmacenTareas");
// @ts-ignore
const inquirer = require("inquirer");
// @ts-ignore
const promptSync = require("prompt-sync");
const fs = require("fs");
const Reportes_1 = require("../Reportes");
const funciones_sistema_1 = require("../funciones_sistema");
const prompt = promptSync();
async function menuPapelera() {
    AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == true).length > 0 ? console.table(AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == true), ["id", "titulo", "estado", "vencimiento"]) : console.log("Papelera vacia");
    let op = await seleccion();
    switch (op) {
        case "1":
            AlmacenTareas_1.almacenTareas.setTareas = (0, Reportes_1.vaciarPapelera)(AlmacenTareas_1.almacenTareas.getTareas);
            fs.writeFileSync((0, funciones_sistema_1.obtenerPathArchivo)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
            console.log("✅ Papelera Vaciada!! ");
            break;
        case "2":
            const tarea = await (0, funciones_sistema_1.menuSelectTarea)(AlmacenTareas_1.almacenTareas.getTareas, true);
            if (!tarea)
                return;
            const nuevoArray = (0, Reportes_1.quitarPapelera)(tarea, AlmacenTareas_1.almacenTareas.getTareas);
            AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
            fs.writeFileSync((0, funciones_sistema_1.obtenerPathArchivo)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
            console.log("✅ Tarea restaurada! -> ♻");
            prompt("voler [ENTER] > ");
            break;
        default:
            return;
    }
}
async function menuMoverAPalera() {
    console.log("Selecciones una tarea");
    const tareaSelec = await (0, funciones_sistema_1.menuSelectTarea)(AlmacenTareas_1.almacenTareas.getTareas, false);
    if (!tareaSelec)
        return;
    const nuevoArray = (0, Reportes_1.moverPapelera)(tareaSelec, AlmacenTareas_1.almacenTareas.getTareas);
    AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
    fs.writeFileSync((0, funciones_sistema_1.obtenerPathArchivo)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
    console.log(`✅ Tarea a la pepelera!! -> 🚮 `);
}
async function seleccion() {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige una opción:",
            choices: [
                { name: "Vaciar (Eliminar Permanentemente) ", value: "1" },
                { name: "Restaurar ", value: "2" },
                { name: "Volver ", value: "0" },
            ]
        }
    ]);
    return opcion;
}
