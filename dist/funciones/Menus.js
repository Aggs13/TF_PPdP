"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txt_path = void 0;
exports.menu_principal = menu_principal;
// solo menu principal
// @ts-ignore
const promptSync = require("prompt-sync");
// @ts-ignore
const inquirer = require("inquirer");
const AlmacenTareas_1 = require("../clases/AlmacenTareas");
const nueva_tarea_menu_1 = require("./menus_carpeta/nueva_tarea_menu");
const funciones_sistema_1 = require("./funciones_sistema");
const papelera_menu_1 = require("./menus_carpeta/papelera_menu");
const buscar_tarea_menu_1 = require("./menus_carpeta/buscar_tarea_menu");
exports.txt_path = (0, funciones_sistema_1.obtener_path)();
const prompt = promptSync();
(0, funciones_sistema_1.cargarTareas)();
async function menu_principal() {
    let op;
    do {
        (0, funciones_sistema_1.limpiarPantalla)();
        op = await menu();
        switch (op) {
            case "1":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("TAREAS");
                const tareas = AlmacenTareas_1.almacenTareas.getTareas.filter(t => t.papelera == false);
                console.table(tareas, ["id", "titulo", "estado", "vencimiento"]);
                prompt("voler [ENTER] > ");
                break;
            case "2":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("NUEVA TAREA");
                const id = parseInt(crypto.randomUUID().slice(0, 4), 16);
                (0, nueva_tarea_menu_1.menuNuevaTarea)(id, false);
                break;
            case "3":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("EDITAR");
                prompt("voler [ENTER] > ");
                break;
            case "4":
                (0, funciones_sistema_1.limpiarPantalla)();
                await (0, buscar_tarea_menu_1.buscarTarea)();
                prompt("voler [ENTER] > ");
                break;
            case "5":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("PAPELERA");
                await (0, papelera_menu_1.menuPapelera)();
                prompt("voler [ENTER] > ");
                break;
            case "6":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("ELIMINAR");
                (0, papelera_menu_1.menuMoverAPalera)();
                prompt("voler [ENTER] > ");
                break;
            case "0":
                (0, funciones_sistema_1.limpiarPantalla)();
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
