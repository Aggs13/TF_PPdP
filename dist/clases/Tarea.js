"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
class Tarea {
    id;
    titulo;
    descripcion;
    estado;
    dificultad;
    creacion;
    ultima_Edicion;
    vencimiento;
    papelera;
    constructor(id, titulo, descripcion, estado, creacion, ultima_Edicion, vencimiento, dificultad, papelera) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.creacion = creacion;
        this.ultima_Edicion = ultima_Edicion;
        this.vencimiento = vencimiento;
        this.dificultad = dificultad;
        this.papelera = papelera;
    }
}
exports.Tarea = Tarea;
