"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTarea = buscarTarea;
// @ts-ignore
const inquirer = require("inquirer");
const Reportes_1 = require("../Reportes");
const listaDificultades = ["Facil", "Medio", "Dificil"];
const listaEstados = ["Pendiente", "En Curso", "Terminada", "Cancelada"];
// @ts-ignore
const promptSync = require("prompt-sync");
const funciones_sistema_1 = require("../funciones_sistema");
const prompt = promptSync();
async function buscarTarea() {
    let opcionBusqueda;
    do {
        opcionBusqueda = await menuBuscarTarea();
        switch (opcionBusqueda.trim()) {
            case "1":
                (0, funciones_sistema_1.limpiarPantalla)();
                const titulo = prompt("🔎🔎 Ingrese el título o parte del titulo de la tarea a buscar: ");
                if (!titulo)
                    return "0";
                (0, Reportes_1.buscarTareaTitulo)(titulo).length > 0 ? console.table((0, Reportes_1.buscarTareaTitulo)(titulo)) : console.log("❌❌ No se encontraron tareas con ese titulo ❌❌");
                break;
            case "2":
                (0, funciones_sistema_1.limpiarPantalla)();
                const id = prompt("🔎🔎 Ingrese el ID de la tarea a buscar: ");
                if (!id)
                    return "0";
                (0, Reportes_1.buscarID)(id).length > 0 ? console.table((0, Reportes_1.buscarID)(id)) : console.log("❌❌ No se encontraron tareas con ese ID ❌❌");
                break;
            case "3":
                (0, funciones_sistema_1.limpiarPantalla)();
                let opEstado = await menuEstado();
                (0, Reportes_1.buscarEstado)(opEstado).length > 0 ? console.table((0, Reportes_1.buscarEstado)(opEstado)) : console.log("❌❌ No hay tareas con ese Estado aun ❌❌");
                break;
            case "4":
                (0, funciones_sistema_1.limpiarPantalla)();
                let opDificultad = await menuDificultad();
                (0, Reportes_1.buscarDificultad)(opDificultad).length > 0 ? console.table((0, Reportes_1.buscarDificultad)(opDificultad)) : console.log("❌❌ No hay tareas con esa Dificultad aun ❌❌");
                break;
            case "0":
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("Volviendo al menu principal ⏪⏪");
                return;
            default:
                (0, funciones_sistema_1.limpiarPantalla)();
                console.log("❌❌ Opción inválida ❌❌");
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
