"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevaTarea = nuevaTarea;
exports.validarDificultad = validarDificultad;
exports.validarEstado = validarEstado;
exports.establecerVencimiento = establecerVencimiento;
exports.moverPapelera = moverPapelera;
exports.quitarPapelera = quitarPapelera;
exports.vaciarPapelera = vaciarPapelera;
const Tarea_1 = require("../clases/Tarea");
function nuevaTarea(id, titulo, descripcion, estado, creacion, ultimaEdicion, vencimiento, dificultad, papelera) {
    const tarea = new Tarea_1.Tarea(id, titulo, descripcion, estado, creacion, ultimaEdicion, vencimiento, dificultad, papelera);
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
// Mover a la papelera
function moverPapelera(id, tareas) {
    return tareas.map(t => {
        return t.id == parseInt(id) ? { ...t, papelera: true } : t;
    });
}
// Quitar de papelera
function quitarPapelera(id, tareas) {
    return tareas.map(t => {
        return t.id == parseInt(id) ? { ...t, papelera: false } : t;
    });
}
// vaciar papelera 
function vaciarPapelera(tareas) {
    const nuevo_array = tareas.filter(t => t.papelera == false);
    return nuevo_array;
}
// condicion ? valor_si_true : valor_si_false
