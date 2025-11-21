"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu_principal = menu_principal;
exports.path_txt = path_txt;
// @ts-ignore
const inquirer = require("inquirer");
// @ts-ignore
const promptSync = require("prompt-sync");
const fs = require("fs");
const path = require("path");
const AlmacenTareas_1 = require("../clases/AlmacenTareas");
const nueva_tarea_menu_1 = require("./menus_carpeta/nueva_tarea_menu");
const prompt = promptSync();
const txt_path = obtener_path();
const cargadas = JSON.parse(fs.readFileSync(txt_path, "utf-8"));
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
                console.table(AlmacenTareas_1.almacenTareas.getTareas, ["id", "titulo", "estado", "vencimiento"]);
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
                prompt("voler [ENTER] > ");
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
// funciones generales
function obtener_path() {
    const txt = path.join(__dirname);
    const txt_path = path_txt(txt);
    return txt_path;
}
function path_txt(txt_path) {
    const texto = path.join(txt_path, "../../archivo_Tareas.txt");
    return texto;
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
                { name: "Eliminar    ", value: "5" },
                { name: "Salir       ", value: "0" }
            ]
        }
    ]);
    return opcion;
}
