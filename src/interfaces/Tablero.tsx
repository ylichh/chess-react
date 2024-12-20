import { CasillaInterface } from "./casilla"

export interface TableroInterface {
    getCasillaFromColumnFile(datosCasilla:CasillaInterface):CasillaInterface|undefined,
    getCasillas():CasillaInterface[]
    updateTableroAfterMovement(casillaAnterior:CasillaInterface,casillaDestino:CasillaInterface):TableroInterface
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
    updateTableroAfterMovement(casillaAnterior:CasillaInterface,casillaDestino:CasillaInterface): TableroInterface {
        let casillaOrigenActualizada:CasillaInterface|undefined=this.getCasillaFromColumnFile(casillaAnterior)
    
        if (casillaOrigenActualizada){
            casillaOrigenActualizada.setPiezaConColor('','')
        }   
        // let casillaDestinoActualizada:CasillaInterface|undefined=posicionTablero.find((casillaPosicion:Casilla)=>casillaPosicion.getNumero()===casillaDestino.getNumero())
        let casillaDestinoActualizada:CasillaInterface|undefined=this.getCasillaFromColumnFile(casillaDestino)
    
        if (casillaDestinoActualizada){
            casillaDestinoActualizada.setPiezaConColor(casillaAnterior.getColorPieza(),casillaAnterior.getPieza())
        }
        return this
    }


}