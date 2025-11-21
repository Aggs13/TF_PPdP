"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTarea = buscarTarea;
// @ts-ignore
const inquirer = require("inquirer");
const Menus_1 = require("../Menus");
const Reportes_1 = require("../Reportes");
const listaDificultades = ["Facil", "Medio", "Dificil"];
const listaEstados = ["Pendiente", "En Curso", "Terminada", "Cancelada"];
// @ts-ignore
const promptSync = require("prompt-sync");
const prompt = promptSync();
async function buscarTarea() {
    let opcionBusqueda;
    do {
        (0, Menus_1.limpiarPantalla)();
        opcionBusqueda = await menuBuscarTarea();
        switch (opcionBusqueda.trim()) {
            case "1":
                (0, Menus_1.limpiarPantalla)();
                const titulo = prompt("Ingrese el título o parte del titulo de la tarea a buscar: ");
                if (!titulo)
                    return "0";
                console.log((0, Reportes_1.buscarTareaTitulo)(titulo));
                break;
            case "2":
                (0, Menus_1.limpiarPantalla)();
                const id = prompt("Ingrese el ID de la tarea a buscar: ");
                if (!id)
                    return "0";
                console.log((0, Reportes_1.buscarID)(parseInt(id)));
                break;
            case "3":
                (0, Menus_1.limpiarPantalla)();
                listaEstados.forEach((estado, i) => {
                    console.log(`[${i + 1}]  ${estado}`);
                });
                let opEstado = await menuEstado();
                console.log(controladorBuscarEstado(opEstado));
                break;
            case "4":
                (0, Menus_1.limpiarPantalla)();
                listaDificultades.forEach((dificultad, i) => {
                    console.log(`[${i + 1}] ${dificultad}`);
                });
                let opDificultad = await menuDificultad();
                console.log(controladorMenuDificultad(opDificultad));
                break;
            case "0":
                (0, Menus_1.limpiarPantalla)();
                console.log("Volviendo al menu principal");
                return;
            default:
                (0, Menus_1.limpiarPantalla)();
                console.log("Opción inválida");
                return;
        }
    } while (opcionBusqueda != "0");
}
//Menu Buscar Tareas
async function menuBuscarTarea() {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige una opción:",
            choices: [
                { name: "Buscar por Titulo  ", value: "1" },
                { name: "Buscar por ID ", value: "2" },
                { name: "Buscar por Estado   ", value: "3" },
                { name: "Buscar por Dificultad     ", value: "4" },
                { name: "Volver       ", value: "0" }
            ]
        }
    ]);
    return opcion;
}
//Menu Estado
async function menuEstado() {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige un Estado",
            choices: listaEstados.map((estado, i) => ({
                name: estado,
                value: estado
            }))
        }
    ]);
    return opcion;
}
function controladorBuscarEstado(opEstado) {
    return (0, Reportes_1.buscarEstado)(opEstado);
}
//Menu Didicultad
async function menuDificultad() {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige una Dificultad",
            choices: listaDificultades.map((dificultad, i) => ({
                name: dificultad,
                value: dificultad
            }))
        }
    ]);
    return opcion;
}
function controladorMenuDificultad(opDificultad) {
    return (0, Reportes_1.buscarDificultad)(opDificultad);
}
