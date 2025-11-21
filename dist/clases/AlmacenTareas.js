"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.almacenTareas = exports.AlmacenTareas = void 0;
class AlmacenTareas {
    list_tareas;
    constructor() {
        this.list_tareas = [];
    }
    get getTareas() {
        return this.list_tareas;
    }
    agregar(t) {
        this.list_tareas.push(t);
    }
}
exports.AlmacenTareas = AlmacenTareas;
exports.almacenTareas = new AlmacenTareas;
