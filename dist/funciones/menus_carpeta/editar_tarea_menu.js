"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuEditarTarea = menuEditarTarea;
// src/funciones/menus_carpeta/editar_tarea_menu.ts
const AlmacenTareas_js_1 = require("../../clases/AlmacenTareas.js");
const Reportes_js_1 = require("../Reportes.js");
const promptSync = require("prompt-sync");
const fs = require("fs");
// Usamos la misma variable que ya existe en Menus.ts
const Menus_js_1 = require("../Menus.js"); // ← ESTA ES LA LÍNEA CLAVE
const prompt = promptSync();
function menuEditarTarea() {
    console.clear();
    console.log("EDITAR TAREA".padEnd(50, "="));
    // Buscar tarea
    const criterio = prompt("Buscar por (1) ID o (2) Título? ");
    let tareaAEditar;
    if (criterio === "1") {
        const id = Number(prompt("Ingrese ID de la tarea: "));
        tareaAEditar = AlmacenTareas_js_1.almacenTareas.getTareas.find(t => t.id === id && !t.papelera);
    }
    else {
        const texto = prompt("Ingrese título (o parte del título): ").toLowerCase();
        const coincidencias = AlmacenTareas_js_1.almacenTareas.getTareas.filter(t => t.titulo.toLowerCase().includes(texto) && !t.papelera);
        if (coincidencias.length === 0) {
            console.log("No se encontraron tareas activas");
            prompt("Presione Enter...");
            return;
        }
        if (coincidencias.length > 1) {
            console.log("\nCoincidencias encontradas:");
            coincidencias.forEach(t => console.log(`  ${t.id} → ${t.titulo}`));
            const id = Number(prompt("Ingrese el ID exacto: "));
            tareaAEditar = coincidencias.find(t => t.id === id);
        }
        else {
            tareaAEditar = coincidencias[0];
        }
    }
    if (!tareaAEditar) {
        console.log("Tarea no encontrada o está en la papelera");
        prompt("\nPresione Enter...");
        return;
    }
    console.log(`\nEditando tarea #${tareaAEditar.id} - ${tareaAEditar.titulo}`);
    console.log("Deje en blanco para mantener el valor actual\n");
    const titulo = prompt(`Título [${tareaAEditar.titulo}]: `) || tareaAEditar.titulo;
    const desc = prompt(`Descripción [${tareaAEditar.descripcion}]: `) || tareaAEditar.descripcion;
    console.log("[1] Facil [2] Normal [3] Dificil");
    const opcionDificultad = prompt(`Dificultad actual [${tareaAEditar.dificultad}] → opción: `) || "0";
    const dificultad = opcionDificultad === "0" ? tareaAEditar.dificultad : ((0, Reportes_js_1.validarDificultad)(opcionDificultad) || tareaAEditar.dificultad);
    console.log("[1] Pendiente [2] En Proceso [3] Cancelado [4] Terminado");
    const opcionEstado = prompt(`Estado actual [${tareaAEditar.estado}] → opción: `) || "0";
    const estado = opcionEstado === "0" ? tareaAEditar.estado : ((0, Reportes_js_1.validarEstado)(opcionEstado) || tareaAEditar.estado);
    console.log(`Vencimiento actual: ${tareaAEditar.vencimiento || "sin fecha"}`);
    const dias = prompt("¿En cuántos días vence ahora? (vacío = mantener): ");
    const vencimiento = dias.trim() === "" ? tareaAEditar.vencimiento : (0, Reportes_js_1.establecerVencimiento)(dias, new Date());
    // Actualizamos
    tareaAEditar.titulo = titulo.trim();
    tareaAEditar.descripcion = desc.trim();
    tareaAEditar.dificultad = dificultad;
    tareaAEditar.estado = estado;
    tareaAEditar.vencimiento = vencimiento;
    tareaAEditar.ultima_Edicion = new Date().toLocaleDateString("es-AR");
    // Guardamos con la ruta correcta
    fs.writeFileSync(Menus_js_1.txt_path, JSON.stringify(AlmacenTareas_js_1.almacenTareas.getTareas, null, 2));
    console.log("\nTarea editada exitosamente!");
    prompt("Presione Enter para continuar...");
}
