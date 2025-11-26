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
exports.crearCambios = crearCambios;
exports.establecerFechaEdicion = establecerFechaEdicion;
exports.totalTareas = totalTareas;
exports.calcPromEstado = calcPromEstado;
exports.cantidadDificultad = cantidadDificultad;
exports.calculoTarea = calculoTarea;
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
function agregarTareaArray(newTarea, lista) {
    return [...lista, newTarea];
}
// Mover a la papelera
function moverPapelera(tarea, tareas) {
    const id = tarea.id;
    return tareas.map(t => {
        return t.id == id ? { ...t, papelera: true } : t;
    });
}
// Quitar de papelera
function quitarPapelera(tareaSelect, tareas) {
    const idNum = tareaSelect.id;
    return tareas.map(t => {
        return t.id == idNum ? { ...t, papelera: false } : t;
    });
}
// vaciar papelera 
function vaciarPapelera(tareas) {
    const nuevoArray = tareas.filter(t => t.papelera == false);
    return nuevoArray;
}
//Buscar Tarea
//Buscar por Titulo
function buscarTareaTitulo(titulo, arrayTareas) {
    return arrayTareas.filter(t => t.papelera == false && t.titulo.toLowerCase().includes(titulo.toLowerCase()));
}
//Buscar por ID
function buscarID(id, arrayTareas) {
    return arrayTareas.filter(t => t.id == id);
}
//Buscar por Estado
function buscarEstado(estado, arrayTareas) {
    return arrayTareas.filter(t => t.estado === estado);
}
//Buscar por Dificultad
function buscarDificultad(dificultad, arrayTareas) {
    return arrayTareas.filter(t => t.dificultad === dificultad);
}
// Editar Tarea
function crearCambios(tareaAeditar, datos) {
    return { ...tareaAeditar, ...datos };
}
function establecerFechaEdicion(fecha) {
    const fechaEdicion = new Date(fecha.getTime());
    return fechaEdicion.toLocaleDateString("es-AR");
}
// ESTADISTICAS
function totalTareas(tareas) {
    return tareas.filter(t => t.papelera == false).length;
}
// promedio estados 
function cantEstado(tareas, estado) {
    return tareas.filter(t => t.estado == estado && t.papelera == false).length;
}
function calcPromEstado(tareas, estado) {
    const total = totalTareas(tareas);
    const tareasEstado = cantEstado(tareas, estado);
    return (tareasEstado * 100) / total;
}
//porcentaje/Cantidad tareas
function cantidadDificultad(tareas, dificultad) {
    return tareas.filter(tarea => tarea.dificultad === dificultad).filter(t => t.papelera == false).length;
}
function calculoTarea(tareas, dificultad) {
    const total = totalTareas(tareas);
    const calculoDIf = cantidadDificultad(tareas, dificultad);
    return (calculoDIf * 100) / total;
}
