"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuNuevaTarea = menuNuevaTarea;
const Reportes_1 = require("../Reportes");
const AlmacenTareas_1 = require("../../clases/AlmacenTareas");
// @ts-ignore
const promptSync = require("prompt-sync");
const fs = require("fs");
const funciones_sistema_1 = require("../funciones_sistema");
const prompt = promptSync();
function menuNuevaTarea(id) {
    const newId = id;
    const titulo = prompt("Titulo: ") || `Tarea[${id}]`;
    const desc = prompt("Descripcion: ") || "";
    const creacion = new Date().toLocaleDateString();
    const ultimaEdicion = "";
    const { dificultad, estado, vencimiento } = validaciones();
    const papelera = false;
    const tarea = (0, Reportes_1.nuevaTarea)(newId, titulo, desc, estado, creacion, ultimaEdicion, vencimiento, dificultad, papelera);
    AlmacenTareas_1.almacenTareas.agregar(tarea);
    fs.writeFileSync((0, funciones_sistema_1.obtenerPathArchivo)(), JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
    console.log("✅ Nueva tarea creada!!  ");
}
function validaciones() {
    // Validar dificultad
    console.log("[1] Facil [2] Normal [3] Dificil");
    const opcionDificultad = prompt("Dificultad: ") || "1";
    const dificultad = (0, Reportes_1.validarDificultad)(opcionDificultad) || "Facil";
    // Validar estado
    console.log("[1] Pendiente", "[2] En Proceso", "[3] Terminado", "[4] Cancelado");
    const opcionEstado = prompt("Estado: ") || "1";
    const estado = (0, Reportes_1.validarEstado)(opcionEstado) || "Pendiente";
    // Validar Vencimiento
    console.log("En cuantos dias vence? ");
    const dias = prompt("Dias: ") || "10";
    const vencimiento = (0, Reportes_1.establecerVencimiento)(dias, new Date());
    return { dificultad, estado, vencimiento };
}
