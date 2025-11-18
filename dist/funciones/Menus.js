"use strict";
// solo funciones para los menus
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu_principal = menu_principal;
function menu_principal() {
    let op;
    do {
        console.log("------------------");
        console.log("[1]-Ver tareas");
        console.log("[2]-Nueva tarea");
        console.log("[3]-Editar");
        console.log("[4]-Buscar");
        console.log("[5]-Eliminar");
        console.log("[0]-Salir");
        console.log("------------------");
        op = prompt("Elige una opcion: ");
        switch (op) {
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "0":
                break;
        }
    } while (op != "0");
}
