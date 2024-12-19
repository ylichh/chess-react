import { CasillaInterface } from "./casilla"

export interface TableroInterface {
    getCasillaFromColumnFile(datosCasilla:CasillaInterface):CasillaInterface|undefined,
    getCasillas():CasillaInterface[]
  }
interface TableroParams{
    casillas:CasillaInterface[]
}
export class Tablero implements TableroInterface{
    private casillas: CasillaInterface[];
    constructor(tableroParams:TableroParams){
        this.casillas=tableroParams.casillas
    }
    getCasillaFromColumnFile(datosCasilla:CasillaInterface):CasillaInterface|undefined{
        let casilla:CasillaInterface|undefined=this.casillas.find((casilla)=>casilla.getColumna()===datosCasilla.getColumna()&&casilla.getFila()===datosCasilla.getFila())
        return casilla
    }
    getCasillas():CasillaInterface[]{
        return this.casillas
    }


}