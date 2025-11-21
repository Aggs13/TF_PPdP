"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuMoverQuitarPapelera = menuMoverQuitarPapelera;
const AlmacenTareas_1 = require("../../clases/AlmacenTareas");
// @ts-ignore
const promptSync = require("prompt-sync");
const fs = require("fs");
const Reportes_1 = require("../Reportes");
const funciones_sistema_1 = require("../funciones_sistema");
const prompt = promptSync();
function menuMoverQuitarPapelera(accion) {
    if (accion) {
        console.table(AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false), ["id", "titulo", "estado", "vencimiento"]);
        const idTarea = prompt("Ingrese el ID > ") || "-1";
        const tareasActuales = AlmacenTareas_1.almacenTareas.getTareas;
        const nuevoArray = (0, Reportes_1.moverPapelera)(idTarea, tareasActuales);
        AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
        fs.writeFileSync((0, funciones_sistema_1.obtener_path)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
    }
    else {
        console.table(AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == true), ["id", "titulo", "estado", "vencimiento"]);
        const idTarea = prompt("Ingrese el ID >") || "-1";
        const tareasActuales = AlmacenTareas_1.almacenTareas.getTareas;
        const nuevoArray = (0, Reportes_1.quitarPapelera)(idTarea, tareasActuales);
        AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
        fs.writeFileSync((0, funciones_sistema_1.obtener_path)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
    }
}
