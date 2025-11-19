"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu_principal = menu_principal;
exports.path_txt = path_txt;
exports.menuNuevaTarea = menuNuevaTarea;
// solo funciones para los menus
const ManejoTareas_1 = require("./ManejoTareas");
// @ts-ignore
const promptSync = require("prompt-sync");
const fs = require("fs");
const path = require("path");
const AlmacenTareas_1 = require("../clases/AlmacenTareas");
const txt = path.join(__dirname);
const tareas_path = path_txt(txt);
const prompt = promptSync();
const almacenTareas = new AlmacenTareas_1.AlmacenTareas;
let array_tareas = almacenTareas.list_tareas;
array_tareas = JSON.parse(fs.readFileSync(tareas_path, "utf-8"));
function menu_principal() {
    let op;
    do {
        limpiarPantalla();
        console.log();
        console.log("------------------");
        console.log("[1]-Ver tareas");
        console.log("[2]-Nueva tarea");
        console.log("[3]-Editar");
        console.log("[4]-Buscar");
        console.log("[5]-Eliminar");
        console.log("[0]-Salir");
        console.log("------------------");
        op = prompt("Elige una opcion > ");
        switch (op) {
            case "1":
                limpiarPantalla();
                const leerTarea = fs.readFileSync(tareas_path, "utf-8");
                console.log(leerTarea);
                prompt("voler [ENTER] > ");
                break;
            case "2":
                limpiarPantalla();
                const id = parseInt(crypto.randomUUID().slice(0, 4), 16);
                menuNuevaTarea(id, false);
                break;
            case "3":
                limpiarPantalla();
                break;
            case "4":
                limpiarPantalla();
                break;
            case "5":
                limpiarPantalla();
                break;
            case "0":
                limpiarPantalla();
                break;
        }
    } while (op != "0");
}
function limpiarPantalla() {
    process.stdout.write('\x1Bc');
}
function path_txt(txt_path) {
    const texto = path.join(txt_path, "../../archivo_Tareas.txt");
    return texto;
}
function menuNuevaTarea(id, edit) {
    const newId = id;
    const titulo = prompt("Titulo: ") || `Tarea[${id}]`;
    const desc = prompt("Descripcion: ") || "";
    const creacion = new Date().toLocaleDateString();
    const ultimaEdicion = "";
    // Validar dificultad
    console.log("[1] Facil [2] Normal [3] Dificil");
    const opcionDificultad = prompt("Dificultad: ") || "1";
    const dificultad = (0, ManejoTareas_1.validarDificultad)(opcionDificultad) || "Facil";
    // Validar estado
    console.log("[1] Pendiente", "[2] En Proceso", "[3] Cancelado", "[4] Terminado");
    const opcionEstado = prompt("Estado: ") || "1";
    const estado = (0, ManejoTareas_1.validarEstado)(opcionEstado) || "Pendiente";
    // Validar Vencimiento
    console.log("En cuantos dias vence? ");
    const dias = prompt("Dias: ") || "10";
    const vencimiento = (0, ManejoTareas_1.establecerVencimiento)(dias, new Date());
    const tarea = (0, ManejoTareas_1.nuevaTarea)(newId, titulo, desc, estado, creacion, ultimaEdicion, vencimiento, dificultad);
    // TEMPORAL
    array_tareas = (0, ManejoTareas_1.agregarTareaArray)(tarea, array_tareas);
    fs.writeFileSync(tareas_path, JSON.stringify(array_tareas, null, 2));
}
