"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_tareas = exports.AlmacenTareas = void 0;
class AlmacenTareas {
    list_tareas;
    constructor() {
        this.list_tareas = [];
    }
}
exports.AlmacenTareas = AlmacenTareas;
const almacenTareas = new AlmacenTareas;
exports.array_tareas = almacenTareas.list_tareas;
