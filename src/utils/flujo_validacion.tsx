
import { CasillaInterface } from "../interfaces/casilla";
import { PIEZAS, PIEZAS_DE_RANGO,PIEZAS_DE_DIRECCION, PIEZAS_CAMINO_LIBRE,COLOR_PIEZA } from "../constants"
import { caminoLibre,} from "./validadores_movimiento"
import { movimientoEnRango } from "./validadores_rango";
import { direccionPosible } from "./validador_direccion";
import { esComestible,casillaOcupada } from "./utilidades";
import { TableroInterface } from "../interfaces/Tablero";

export interface MovimientoHandler {
        siguienteCondicion(handler: MovimientoHandler): MovimientoHandler;
        evaluar(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface): boolean;
    }

export abstract class AbstractMovimientoHandler implements MovimientoHandler {
        private siguienteValidador: MovimientoHandler | null = null;
        protected pieza: PIEZAS|undefined;

        public siguienteCondicion(handler: MovimientoHandler): MovimientoHandler {
            this.siguienteValidador = handler;
            return handler;
        }
        
        public evaluar(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface): boolean {
            if (this.siguienteValidador) {
                return this.siguienteValidador.evaluar(casillaOrigen, casillaDestino, posicionTablero);
            }
            return true;
        }


    }
    
class RangoEvaluador extends AbstractMovimientoHandler {

        //ver si lo debe evaluar. si es asi lo evaluas, si falla return false, si no falla, que pase al siguiente, si no debe evaluarlo que pase al siguiente
        public evaluar(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface): boolean {
            if (PIEZAS_DE_RANGO.includes(casillaOrigen.getPieza() as PIEZAS)) {
                console.log('rango')
                if (movimientoEnRango(casillaOrigen, casillaDestino, posicionTablero)){
                    return super.evaluar(casillaOrigen, casillaDestino, posicionTablero);
                }else{
                    return false
                };
            }
            return super.evaluar(casillaOrigen, casillaDestino, posicionTablero);
        }
    }

class DireccionEvaluador extends AbstractMovimientoHandler {
        public evaluar(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface): boolean {
            if (PIEZAS_DE_DIRECCION.includes(casillaOrigen.getPieza() as PIEZAS)) {
                console.log('direccion')
                if(direccionPosible(casillaOrigen, casillaDestino)){
                    return super.evaluar(casillaOrigen, casillaDestino, posicionTablero);
                }else{
                    return false
                };
            }
            return super.evaluar(casillaOrigen, casillaDestino, posicionTablero);
        }
    }

class CaminoLibreEvaluador extends AbstractMovimientoHandler {
        public evaluar(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface): boolean {
            if (PIEZAS_CAMINO_LIBRE.includes(casillaOrigen.getPieza() as PIEZAS)) {
                console.log('camino libre')
                if (caminoLibre(casillaOrigen, casillaDestino, posicionTablero)){
                    return super.evaluar(casillaOrigen, casillaDestino, posicionTablero);
                }else{
                    return false
                };
            }
            return super.evaluar(casillaOrigen, casillaDestino, posicionTablero);
        }


    }

class CasillaOcupable extends AbstractMovimientoHandler {
        public evaluar(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface): boolean {
            console.log('casilla ocupada')
            if (casillaOcupada(casillaDestino)) {
                return this.casillaOcupadaEvaluacion(casillaOrigen, casillaDestino, posicionTablero)
            }else{
                return super.evaluar(casillaOrigen, casillaDestino, posicionTablero)
            }
        }
        public casillaOcupadaEvaluacion(casillaOrigen: CasillaInterface, casillaDestino: CasillaInterface, posicionTablero: TableroInterface): boolean {
            if(esComestible(casillaOrigen, casillaDestino)){
                return super.evaluar(casillaOrigen, casillaDestino, posicionTablero)
            }
            else{
                return false
            }
        }
        
    }

export function movimientoValido(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface,casillaDestino:CasillaInterface,siguienteJugador:COLOR_PIEZA){
        if (casillaOrigen.getColorPieza()!==siguienteJugador){
            return false
        }
        const rangoEvaluador = new RangoEvaluador();
        const direccionEvaluador = new DireccionEvaluador();
        const caminoLibreEvaluador = new CaminoLibreEvaluador();
        const casillaOcupableEvaluador = new CasillaOcupable();
        rangoEvaluador.siguienteCondicion(direccionEvaluador).siguienteCondicion(caminoLibreEvaluador).siguienteCondicion(casillaOcupableEvaluador);
        return rangoEvaluador.evaluar(casillaOrigen, casillaDestino, posicionTablero);
    }