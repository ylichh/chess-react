import { caminoLibre } from "../utils/validadores_movimiento";
import { obtenDireccionSentido,esComestible,casillaOcupada } from "../utils/utilidades";
import { describe, it, expect, beforeAll } from 'vitest';
import { CasillaType } from "../utils/initial_state";

describe("getDireccionSentido", () => {
    it("should return the direction and sense of the movement", () => {
        let casillaOrigen = { fila: 0, columna: 0 };
        let casillaDestino = { fila: 0, columna: 2 };
        let direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 });

        casillaOrigen = { fila: 0, columna: 3 };
        casillaDestino = { fila: 0, columna: 5 };
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 });

        casillaOrigen = { fila: 4, columna: 6 };
        casillaDestino = { fila: 4, columna: 8 };
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 }); 

        casillaOrigen = { fila: 2, columna: 5 };
        casillaDestino = { fila: 2, columna: 7 };
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: 1 }); 

        casillaOrigen = { fila: 2, columna: 3 };
        casillaDestino = { fila: 2, columna: 2 };
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 0, sentidoColumna: -1 });     

        
         
        casillaOrigen = { fila: 1, columna: 3 };
        casillaDestino = { fila: 4, columna: 3 };
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 1, sentidoColumna: 0 });   

        casillaOrigen = { fila: 1, columna: 5 };
        casillaDestino = { fila: 3, columna: 5 };
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: 1, sentidoColumna: 0 });   

        casillaOrigen = { fila: 5, columna: 5 };
        casillaDestino = { fila: 2, columna: 5 };
        direccionSentido = obtenDireccionSentido(casillaOrigen, casillaDestino);
        expect(direccionSentido).toEqual({ sentidoFila: -1, sentidoColumna: 0 });  
    });
});

describe("piezaEnElCamino", () => {

    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = { fila: 0, columna: 0 };
        let casillaDestino = { fila: 0, columna: 2 };
        let posicionTablero = [{
            fila: 0,
            columna: 1,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = { fila: 1, columna: 0 };
        let casillaDestino = { fila: 1, columna: 5 };
        let posicionTablero = [{
            fila: 1,
            columna: 3,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = { fila: 1, columna: 0 };
        let casillaDestino = { fila: 1, columna: 5 };
        let posicionTablero = [{
            fila: 2,
            columna: 3,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true if there is a piece in the way", () => {
        let casillaOrigen = { fila: 1, columna: 5 };
        let casillaDestino = { fila: 1, columna: 0 };
        let posicionTablero = [{
            fila: 1,
            columna: 3,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true if there is a piece in the way starting from a corner", () => {
        let casillaOrigen = { fila: 7, columna: 7 };
        let casillaDestino = { fila: 0, columna: 0 };
        let posicionTablero = [{
            fila: 1,
            columna: 3,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return false", () => {
        let casillaOrigen = { fila: 7, columna: 5 };
        let casillaDestino = { fila: 1, columna: 5 };
        let posicionTablero = [{
            fila: 4,
            columna: 5,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(false);
    });
    it("should return true si hay una pieza en la casilla de destino", () => {
        let casillaOrigen = { fila: 7, columna: 7 };
        let casillaDestino = { fila: 0, columna: 0 };
        let posicionTablero = [{
            fila: 0,
            columna: 0,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true si hay una pieza en la casilla de destino", () => {
        let casillaOrigen = { fila: 0, columna: 0 };
        let casillaDestino = { fila: 2, columna: 0 };
        let posicionTablero = [{
            fila: 7,
            columna: 7,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true si hay una pieza en la casilla destino", () => {
        let casillaOrigen = { fila: 3, columna: 4 };
        let casillaDestino = { fila: 5, columna: 6 };
        let posicionTablero = [{
            fila: 5,
            columna: 6,
            pieza: "peon"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
    it("should return true al movimiento del peon comiendo desde posicion de origen", () => {
        let casillaOrigen = { fila: 1, columna: 2 };
        let casillaDestino = { fila: 2, columna: 3 };
        let posicionTablero = [{
            fila: 5,
            columna: 6,
            pieza: "peon_blanco"
        }];
        expect(caminoLibre(casillaOrigen, casillaDestino, posicionTablero)).toBe(true);
    });
});


describe("Si la casilla está ocupada", () => {
    it("debe devolver true", () => {
        let casillaDestino = { fila: 0, columna: 2,pieza:"peon" };
        expect(casillaOcupada(casillaDestino)).toBe(true);
    });
    it("debe devolver false", () => {
        let casillaDestino = { fila: 0, columna: 2,pieza:"" };
        expect(casillaOcupada(casillaDestino)).toBe(false);
    });
    it("debe devolver false", () => {
        let casillaDestino = { fila: 0, columna: 2,pieza:"" };
        expect(casillaOcupada(casillaDestino)).toBe(false);
    });
});



describe("Si la casilla está ocupada con una pieza de distinto color", () => {
    it("debe devolver true", () => {
        let casillaOrigen={
            colorPieza:"blanco"
        }
        let casillaDestino = {
            colorPieza:"negro"
        }
        expect(esComestible(casillaOrigen,casillaDestino)).toBe(true);
    });
    it("debe devolver false", () => {
        let casillaOrigen={
            colorPieza:"negro"
        }
        let casillaDestino = {
            colorPieza:"negro"
        }
        expect(esComestible(casillaOrigen,casillaDestino)).toBe(false);
    });
});