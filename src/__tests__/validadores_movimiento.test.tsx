import { caminoLibre } from "../utils/validadores_movimiento";
import { obtenDireccionSentido,esComestible,casillaOcupada } from "../utils/utilidades";
import { describe, it, expect, beforeAll } from 'vitest';
import { Casilla } from "../interfaces/casilla";
describe("getDireccionSentido", () => {
    it("should return the direction and sense of the movement", () => {
        let casillaOrigen = new Casilla({ fila: 0, columna: 0 });
        let casillaDestino = new Casilla({ color: 'blanco', fila: 0, columna: 2 });

        let direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 });

        casillaOrigen = new Casilla({ fila: 0, columna: 3 });
        casillaDestino = new Casilla({ fila: 0, columna: 5 });
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 });

        casillaOrigen = new Casilla({ fila: 4, columna: 6 });
        casillaDestino = new Casilla({ fila: 4, columna: 8 });
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 });

        casillaOrigen = new Casilla({ fila: 2, columna: 5 });
        casillaDestino = new Casilla({ fila: 2, columna: 7 });
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 });

        casillaOrigen = new Casilla({ fila: 2, columna: 3 });
        casillaDestino = new Casilla({ fila: 2, columna: 2 });
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: -1 });

        casillaOrigen = new Casilla({ fila: 1, columna: 3 });
        casillaDestino = new Casilla({ fila: 4, columna: 3 });
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 1, sentidoColumna: 0 });

        casillaOrigen = new Casilla({ fila: 1, columna: 5 });
        casillaDestino = new Casilla({ fila: 3, columna: 5 });
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 1, sentidoColumna: 0 });

        casillaOrigen = new Casilla({ fila: 5, columna: 5 });
        casillaDestino = new Casilla({ fila: 2, columna: 5 });
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: -1, sentidoColumna: 0 });
    });
});
describe("piezaEnElCamino", () => {
    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = new Casilla({ fila: 0, columna: 0 });
        let casillaDestino = new Casilla({ fila: 0, columna: 2 });
        let posicionTablero = [new Casilla({ fila: 0, columna: 1, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = new Casilla({ fila: 1, columna: 0 });
        let casillaDestino = new Casilla({ fila: 1, columna: 5 });
        let posicionTablero = [new Casilla({ fila: 1, columna: 3, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = new Casilla({ fila: 1, columna: 0 });
        let casillaDestino = new Casilla({ fila: 1, columna: 5 });
        let posicionTablero = [new Casilla({ fila: 2, columna: 3, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = new Casilla({ fila: 1, columna: 5 });
        let casillaDestino = new Casilla({ fila: 1, columna: 0 });
        let posicionTablero = [new Casilla({ fila: 1, columna: 3, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true if there is a piece in the way starting from a corner", () => {
        let casillaOrigen = new Casilla({ fila: 7, columna: 7 });
        let casillaDestino = new Casilla({ fila: 0, columna: 0 });
        let posicionTablero = [new Casilla({ fila: 1, columna: 3, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return false", () => {
        let casillaOrigen = new Casilla({ fila: 7, columna: 5 });
        let casillaDestino = new Casilla({ fila: 1, columna: 5 });
        let posicionTablero = [new Casilla({ fila: 4, columna: 5, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true si hay una pieza en la casilla de destino", () => {
        let casillaOrigen = new Casilla({ fila: 7, columna: 7 });
        let casillaDestino = new Casilla({ fila: 0, columna: 0 });
        let posicionTablero = [new Casilla({ fila: 0, columna: 0, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true si hay una pieza en la casilla de destino", () => {
        let casillaOrigen = new Casilla({ fila: 0, columna: 0 });
        let casillaDestino = new Casilla({ fila: 2, columna: 0 });
        let posicionTablero = [new Casilla({ fila: 7, columna: 7, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true si hay una pieza en la casilla destino", () => {
        let casillaOrigen = new Casilla({ fila: 3, columna: 4 });
        let casillaDestino = new Casilla({ fila: 5, columna: 6 });
        let posicionTablero = [new Casilla({ fila: 5, columna: 6, pieza: "peon" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true al movimiento del peon comiendo desde posicion de origen", () => {
        let casillaOrigen = new Casilla({ fila: 1, columna: 2 });
        let casillaDestino = new Casilla({ fila: 2, columna: 3 });
        let posicionTablero = [new Casilla({ fila: 5, columna: 6, pieza: "peon_blanco" })];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
});

describe("Si la casilla está ocupada", () => {
    it("debe devolver true", () => {
        let casillaDestino = new Casilla({ fila: 0, columna: 2, pieza: "peon" });
        expect(casillaOcupada(casillaDestino)).toBe(true);
    });
    it("debe devolver false", () => {
        let casillaDestino = new Casilla({ fila: 0, columna: 2, pieza: "" });
        expect(casillaOcupada(casillaDestino)).toBe(false);
    });
    it("debe devolver false", () => {
        let casillaDestino = new Casilla({ fila: 0, columna: 2, pieza: "" });
        expect(casillaOcupada(casillaDestino)).toBe(false);
    });
});

describe("Si la casilla está ocupada con una pieza de distinto color", () => {
    it("debe devolver true", () => {
        let casillaOrigen = new Casilla({ columna:0,fila:0,colorPieza: "blanco" });
        let casillaDestino = new Casilla({ columna:0,fila:0,colorPieza: "negro" });
        expect(esComestible(casillaOrigen, casillaDestino)).toBe(true);
    });
    it("debe devolver false", () => {
        let casillaOrigen = new Casilla({ columna:0,fila:0,colorPieza: "negro" });
        let casillaDestino = new Casilla({columna:0,fila:0, colorPieza: "negro" });
        expect(esComestible(casillaOrigen, casillaDestino)).toBe(false);
    });
});
