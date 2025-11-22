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
            console.log("✅ Papelera Vaciada!! ");
            break;
        case "2":
            console.log("[ENTER] Cancelar");
            const idTarea = prompt("Ingrese el ID>") || "-1";
            const tareasActuales = AlmacenTareas_1.almacenTareas.getTareas;
            const nuevoArray = (0, Reportes_1.quitarPapelera)(idTarea, tareasActuales);
            if (nuevoArray === null) {
                console.log("❌ No se encontró una tarea con ese ID");
                prompt("volver [ENTER] > ");
                return;
            }
            AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
            fs.writeFileSync((0, funciones_sistema_1.obtener_path)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
            console.log("✅ Tarea restaurada! -> ♻");
            prompt("voler [ENTER] > ");
            break;
        default:
            return;
            break;
    }
}
function menuMoverAPalera() {
    console.table(AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false), ["id", "titulo", "estado", "vencimiento"]);
    const idTarea = prompt("Ingrese el ID > ") || "-1";
    const tareasActuales = AlmacenTareas_1.almacenTareas.getTareas;
    const nuevoArray = (0, Reportes_1.moverPapelera)(idTarea, tareasActuales);
    if (nuevoArray === null) {
        console.log("❌ No se encontró una tarea con ese ID");
        prompt("volver [ENTER] > ");
        return;
    }
    AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
    fs.writeFileSync((0, funciones_sistema_1.obtener_path)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
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
