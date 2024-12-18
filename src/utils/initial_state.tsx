
import { CASILLAS_DATA,PIEZAS,COLOR_PIEZA } from '../constants';
import { Casilla } from '../interfaces/casilla';
export interface CasillaType {
  color?: string;
  columna?: number;
  fila?: number;
  numero?: number;
  pieza?: string;
  colorPieza?: string;
}
interface EstadoTablero {
  casillas: Casilla[];
}
interface PiezaType{
  pieza?:string;
  colorPieza?:string;
  codigo?:string;
}
export const generateInitialState = () => {
  const estado_tablero:EstadoTablero={casillas:[]};
  for (let numero_casilla = 0; numero_casilla < 64; numero_casilla++) {
    const fila=Math.floor(numero_casilla/8)
    const columna=numero_casilla % 8
    const [pieza,colorPieza]= pieza_color(columna,fila,numero_casilla+1)

    estado_tablero.casillas.push(
      new Casilla({
        color:color_casilla(numero_casilla),
        columna:columna, //x
        fila:fila,//y
        numero:numero_casilla+1,
        pieza:pieza,
        colorPieza:colorPieza
      }

      )
    ); 
  }

  return estado_tablero.casillas;
};

const color_casilla=(casilla:number)=>{
  const color=(casilla+Math.floor(casilla/8))%2 === 1 ? CASILLAS_DATA.CASILLA_BLANCA:CASILLAS_DATA.CASILLA_NEGRA
  return color
}

const pieza_color = (columna: number, fila: number, numero_casilla: number) => {
  if (fila === 1) {
    return [PIEZAS.PEON_BLANCO, COLOR_PIEZA.BLANCO];
  }
  if (fila === 6) {
    return [PIEZAS.PEON_NEGRO, COLOR_PIEZA.NEGRO];
  }
  if ((columna === 0 && fila === 0) || (columna === 7 && fila === 0)) {
    return [PIEZAS.TORRE_BLANCA, COLOR_PIEZA.BLANCO];
  }
  if ((columna === 0 && fila === 7) || (columna === 7 && fila === 7)) {
    return [PIEZAS.TORRE_NEGRA, COLOR_PIEZA.NEGRO];
  }
  if ((columna === 1 && fila === 0) || (columna === 6 && fila === 0)) {
    return [PIEZAS.CABALLO_BLANCO, COLOR_PIEZA.BLANCO];
  }
  if ((columna === 1 && fila === 7) || (columna === 6 && fila === 7)) {
    return [PIEZAS.CABALLO_NEGRO, COLOR_PIEZA.NEGRO];
  }
  if ((columna === 2 && fila === 0) || (columna === 5 && fila === 0)) {
    return [PIEZAS.ALFIL_BLANCO, COLOR_PIEZA.BLANCO];
  }
  if ((columna === 2 && fila === 7) || (columna === 5 && fila === 7)) {
    return [PIEZAS.ALFIL_NEGRO, COLOR_PIEZA.NEGRO];
  }
  if (columna === 3 && fila === 0) {
    return [PIEZAS.REY_BLANCO, COLOR_PIEZA.BLANCO];
  }
  if (columna === 3 && fila === 7) {
    return [PIEZAS.REY_NEGRO, COLOR_PIEZA.NEGRO];
  }
  if (columna === 4 && fila === 0) {
    return [PIEZAS.REINA_BLANCA, COLOR_PIEZA.BLANCO];
  }
  if (columna === 4 && fila === 7) {
    return [PIEZAS.REINA_NEGRA, COLOR_PIEZA.NEGRO];
  }
  return ["", ""];
};
