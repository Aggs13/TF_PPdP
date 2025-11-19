"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevaTarea = nuevaTarea;
exports.validarDificultad = validarDificultad;
exports.validarEstado = validarEstado;
exports.establecerVencimiento = establecerVencimiento;
exports.agregarTareaArray = agregarTareaArray;
const Tarea_1 = require("../clases/Tarea");
// leer archivo donde van las tareas
function nuevaTarea(id, titulo, descripcion, estado, creacion, ultimaEdicion, vencimiento, dificultad) {
    const tarea = new Tarea_1.Tarea(id, titulo, descripcion, estado, creacion, ultimaEdicion, vencimiento, dificultad);
    return tarea;
}
function validarDificultad(dificultadOpcion) {
    const dificultades = ["Facil", "Normal", "Dificil"];
    const dificultadSelect = parseInt(dificultadOpcion);
    return dificultades[dificultadSelect - 1];
}
function validarEstado(estadoOpcion) {
    const estados = ["Pendiente", "En Proceso", "Terminado", "Cancelado"];
    const estadoSelect = parseInt(estadoOpcion);
    return estados[estadoSelect - 1];
}
function establecerVencimiento(dias, fecha) {
    let diasVencimiento = parseInt(dias);
    const fechaVencimiento = new Date(fecha.getTime());
    fechaVencimiento.setDate(fechaVencimiento.getDate() + diasVencimiento);
    return fechaVencimiento.toLocaleDateString("es-AR");
}
function agregarTareaArray(newTarea, lista) {
    return [...lista, newTarea];
}
