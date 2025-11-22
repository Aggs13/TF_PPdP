"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevaTarea = nuevaTarea;
exports.validarDificultad = validarDificultad;
exports.validarEstado = validarEstado;
exports.establecerVencimiento = establecerVencimiento;
exports.agregarTareaArray = agregarTareaArray;
exports.moverPapelera = moverPapelera;
exports.quitarPapelera = quitarPapelera;
exports.vaciarPapelera = vaciarPapelera;
exports.buscarTareaTitulo = buscarTareaTitulo;
exports.buscarID = buscarID;
exports.buscarEstado = buscarEstado;
exports.buscarDificultad = buscarDificultad;
const Tarea_1 = require("../clases/Tarea");
const AlmacenTareas_1 = require("../clases/AlmacenTareas");
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
function agregarTareaArray(newTarea, lista) {
    return [...lista, newTarea];
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
//Buscar Tarea
//Buscar por Titulo
function buscarTareaTitulo(titulo) {
    return AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false && t.titulo.toLowerCase().includes(titulo.toLowerCase()));
}
//Buscar por ID
function buscarID(id) {
    return AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.id === id);
}
//Buscar por Estado
function buscarEstado(estado) {
    return AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.estado === estado);
}
//Buscar por Dificultad
function buscarDificultad(dificultad) {
    return AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.dificultad === dificultad);
}
