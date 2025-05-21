import { CasillaInterface } from '../interfaces/casilla';
export function obtenDireccionSentidoLineal(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface) {
  const filaDestino = casillaDestino.getFila();
  const filaOrigen = casillaOrigen.getFila();
  const desplazamientoFila = filaDestino - filaOrigen;
  const desplazamientoAbsFila = Math.abs(desplazamientoFila);

  const columnaDestino = casillaDestino.getColumna();
  const columnaOrigen = casillaOrigen.getColumna();
  const desplazamientoColumna = columnaDestino - columnaOrigen;
  const desplazamientoAbsColumna = Math.abs(desplazamientoColumna);
  if (desplazamientoAbsColumna === desplazamientoAbsFila || desplazamientoAbsColumna === 0 || desplazamientoAbsFila === 0) {
    const vectorDireccion = obtenerVectorIteracion(desplazamientoColumna, desplazamientoFila);
    return vectorDireccion;
  } else {
    throw new Error('Movimiento no lineal');
  }
}

export function obtenSigno(numero: number): number {
  if (numero > 0) return 1;
  if (numero < 0) return -1;
  return 0;
}

export function obtenerVectorIteracion(desplazamientoColumna: number, desplazamientoFila: number) {
  return {
    sentidoColumna: obtenSigno(desplazamientoColumna),
    sentidoFila: obtenSigno(desplazamientoFila),
  };
}

export function normalizar_vector(sentidoColumna: number, sentidoFila: number): { sentidoColumna: number; sentidoFila: number } {
  const mcd = Math.abs(sentidoColumna) > Math.abs(sentidoFila) ? Math.abs(sentidoColumna) : Math.abs(sentidoFila);
  sentidoColumna = sentidoColumna / mcd;
  sentidoFila = sentidoFila / mcd;
  return { sentidoColumna: sentidoColumna, sentidoFila: sentidoFila };
}
export function casillaOcupada(casillaDestino: CasillaInterface) {
  return casillaDestino.getPieza() !== '';
}

export function esComestible(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface) {
  return casillaOrigen.getColorPieza() !== casillaDestino.getColorPieza();
}
