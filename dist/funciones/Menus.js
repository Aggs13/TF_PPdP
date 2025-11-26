"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu_principal = menu_principal;
// solo menu principal
// @ts-ignore
const promptSync = require("prompt-sync");
// @ts-ignore
const inquirer = require("inquirer");
const nueva_tarea_menu_1 = require("./menus_carpeta/nueva_tarea_menu");
const funciones_sistema_1 = require("./funciones_sistema");
const editar_tarea_menu_js_1 = require("./menus_carpeta/editar_tarea_menu.js");
const papelera_menu_1 = require("./menus_carpeta/papelera_menu");
const buscar_tarea_menu_1 = require("./menus_carpeta/buscar_tarea_menu");
const ver_tarea_menu_1 = require("./menus_carpeta/ver_tarea_menu");
const prompt = promptSync();
// se cargan las tareas en el array
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
                await (0, ver_tarea_menu_1.menuVerTarea)();
                break;
            case "2":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("NUEVA TAREA");
                const id = parseInt(crypto.randomUUID().slice(0, 4), 16);
                (0, nueva_tarea_menu_1.menuNuevaTarea)(id);
                break;
            case "3":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("EDITAR TAREA");
                await (0, editar_tarea_menu_js_1.menuEditarTarea)();
                break;
            case "4":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("BUSCAR TAREA");
                await (0, buscar_tarea_menu_1.buscarTarea)();
                break;
            case "5":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("PAPELERA");
                await (0, papelera_menu_1.menuPapelera)();
                break;
            case "6":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("ELIMINAR");
                await (0, papelera_menu_1.menuMoverAPalera)();
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
