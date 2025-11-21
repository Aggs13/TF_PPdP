"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txt_path = void 0;
exports.menu_principal = menu_principal;
exports.obtener_path = obtener_path;
exports.path_txt = path_txt;
// solo funciones para los menus
// @ts-ignore
const inquirer = require("inquirer");
// @ts-ignore
const promptSync = require("prompt-sync");
const fs = require("fs");
const path = require("path");
const AlmacenTareas_1 = require("../clases/AlmacenTareas");
const nueva_tarea_menu_1 = require("./menus_carpeta/nueva_tarea_menu");
const Reportes_1 = require("./Reportes");
exports.txt_path = obtener_path();
const prompt = promptSync();
const cargadas = JSON.parse(fs.readFileSync(exports.txt_path, "utf-8"));
for (const t of cargadas) {
    AlmacenTareas_1.almacenTareas.agregar(t);
}
async function menu_principal() {
    let op;
    do {
        limpiarPantalla();
        op = await menu();
        switch (op) {
            case "1":
                limpiarPantalla();
                const tareas = AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false);
                console.table(tareas, ["id", "titulo", "estado", "vencimiento"]);
                prompt("voler [ENTER] > ");
                break;
            case "2":
                limpiarPantalla();
                const id = parseInt(crypto.randomUUID().slice(0, 4), 16);
                (0, nueva_tarea_menu_1.menuNuevaTarea)(id, false);
                break;
            case "3":
                limpiarPantalla();
                prompt("voler [ENTER] > ");
                break;
            case "4":
                limpiarPantalla();
                prompt("voler [ENTER] > ");
                break;
            case "5":
                limpiarPantalla();
                menuMoverQuitarPapelera(false);
                prompt("voler [ENTER] > ");
                break;
            case "6":
                limpiarPantalla();
                menuMoverQuitarPapelera(true);
                prompt("voler [ENTER] > ");
                break;
            case "0":
                limpiarPantalla();
                break;
        }
    } while (op != "0");
}
async function menu() {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige una opción:",
            choices: [
                { name: "Ver tareas  ", value: "1" },
                { name: "Nueva tarea ", value: "2" },
                { name: "Editar      ", value: "3" },
                { name: "Buscar      ", value: "4" },
                { name: "Papelera    ", value: "5" },
                { name: "Eliminar    ", value: "6" },
                { name: "Salir       ", value: "0" }
            ]
        }
    ]);
    return opcion;
}
function menuMoverQuitarPapelera(accion) {
    if (accion) {
        console.table(AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false), ["id", "titulo", "estado", "vencimiento"]);
        const idTarea = prompt("Ingrese el ID > ");
        const tareasActuales = AlmacenTareas_1.almacenTareas.getTareas;
        const nuevoArray = (0, Reportes_1.moverPapelera)(idTarea, tareasActuales);
        AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
        fs.writeFileSync(exports.txt_path, JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
    }
    else {
        console.table(AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == true), ["id", "titulo", "estado", "vencimiento"]);
        const idTarea = prompt("Ingrese el ID >");
        const tareasActuales = AlmacenTareas_1.almacenTareas.getTareas;
        const nuevoArray = (0, Reportes_1.quitarPapelera)(idTarea, tareasActuales);
        AlmacenTareas_1.almacenTareas.setTareas = nuevoArray;
        fs.writeFileSync(exports.txt_path, JSON.stringify(AlmacenTareas_1.almacenTareas.getTareas, null, 2));
    }
}
// funciones generales
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
