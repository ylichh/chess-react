
import { CasillaInterface } from "../interfaces/casilla";
import { PIEZAS, PIEZAS_DE_RANGO,PIEZAS_DE_DIRECCION, PIEZAS_CAMINO_LIBRE,COLOR_PIEZA } from "../constants"
import { caminoLibre,} from "./validadores_movimiento"
import { movimientoEnRango } from "./validadores_rango";
import { direccionPosible } from "./validador_direccion";
import { esComestible,casillaOcupada } from "./utilidades";
import { TableroInterface } from "../interfaces/Tablero";
import { MovimientosEspecialesInterface } from "../interfaces/movimientosEspeciales";

interface MovimientoValidoArgumentos{
    casillaOrigen:CasillaInterface,
    posicionTablero:TableroInterface,
    casillaDestino:CasillaInterface,
    siguienteJugador:COLOR_PIEZA,
    movimientosEspeciales:MovimientosEspecialesInterface
}

export interface MovimientoHandler {
        siguienteCondicion(handler: MovimientoHandler): MovimientoHandler;
        evaluar(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean;
    }

export abstract class AbstractMovimientoHandler implements MovimientoHandler {
        private siguienteValidador: MovimientoHandler | null = null;
        protected pieza: PIEZAS|undefined;

        public siguienteCondicion(handler: MovimientoHandler): MovimientoHandler {
            this.siguienteValidador = handler;
            return handler;
        }
        
        public evaluar(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean {
            if (this.siguienteValidador) {
                return this.siguienteValidador.evaluar(argumentosMovimientosValidos);
            }
            return true;
        }


    }
    
class RangoEvaluador extends AbstractMovimientoHandler {

        //ver si lo debe evaluar. si es asi lo evaluas, si falla return false, si no falla, que pase al siguiente, si no debe evaluarlo que pase al siguiente
        public evaluar(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean {
            if (PIEZAS_DE_RANGO.includes(argumentosMovimientosValidos.casillaOrigen.getPieza() as PIEZAS)) {
                console.log('rango')
                if (movimientoEnRango(
                    {
                        casillaOrigen:argumentosMovimientosValidos.casillaOrigen,
                        casillaDestino:argumentosMovimientosValidos.casillaDestino,
                        posicionTablero:argumentosMovimientosValidos.posicionTablero,
                        movimientosEspeciales:argumentosMovimientosValidos.movimientosEspeciales
                    })){
                    return super.evaluar(argumentosMovimientosValidos);
                }else{
                    return false
                };
            }
            return super.evaluar(argumentosMovimientosValidos);
        }
    }

class DireccionEvaluador extends AbstractMovimientoHandler {
        public evaluar(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean {
            if (PIEZAS_DE_DIRECCION.includes(argumentosMovimientosValidos.casillaOrigen.getPieza() as PIEZAS)) {
                console.log('direccion')
                if(direccionPosible(argumentosMovimientosValidos.casillaOrigen, argumentosMovimientosValidos.casillaDestino)){
                    return super.evaluar(argumentosMovimientosValidos);
                }else{
                    return false
                };
            }
            return super.evaluar(argumentosMovimientosValidos);
        }
    }

class CaminoLibreEvaluador extends AbstractMovimientoHandler {
        public evaluar(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean {
            if (PIEZAS_CAMINO_LIBRE.includes(argumentosMovimientosValidos.casillaOrigen.getPieza() as PIEZAS)) {
                console.log('camino libre')
                if (caminoLibre(argumentosMovimientosValidos.casillaOrigen, argumentosMovimientosValidos.casillaDestino, argumentosMovimientosValidos.posicionTablero)){
                    return super.evaluar(argumentosMovimientosValidos);
                }else{
                    return false
                };
            }
            return super.evaluar(argumentosMovimientosValidos);
        }


    }

class CasillaOcupable extends AbstractMovimientoHandler {
        public evaluar(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean {
            console.log('casilla ocupada')
            if (casillaOcupada(argumentosMovimientosValidos.casillaDestino)) {
                return this.casillaOcupadaEvaluacion(argumentosMovimientosValidos)
            }else{
                return super.evaluar(argumentosMovimientosValidos)
            }
        }
        public casillaOcupadaEvaluacion(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean {
            if(esComestible(argumentosMovimientosValidos.casillaOrigen, argumentosMovimientosValidos.casillaDestino)){
                return super.evaluar(argumentosMovimientosValidos)
            }
            else{
                return false
            }
        }
        
    }

class JugadorPermitido extends AbstractMovimientoHandler{
    public evaluar(argumentosMovimientosValidos:MovimientoValidoArgumentos): boolean {
        if (argumentosMovimientosValidos.casillaOrigen.getColorPieza()!==argumentosMovimientosValidos.siguienteJugador){
            return false
        }
        return super.evaluar(argumentosMovimientosValidos);
    }

}


export function movimientoValido(argumentosMovimientoValido:MovimientoValidoArgumentos){
        const jugadorPermitido = new JugadorPermitido();
        const rangoEvaluador = new RangoEvaluador();
        const direccionEvaluador = new DireccionEvaluador();
        const caminoLibreEvaluador = new CaminoLibreEvaluador();
        const casillaOcupableEvaluador = new CasillaOcupable();
        jugadorPermitido.siguienteCondicion(rangoEvaluador).siguienteCondicion(direccionEvaluador).siguienteCondicion(caminoLibreEvaluador).siguienteCondicion(casillaOcupableEvaluador);
        return jugadorPermitido.evaluar(argumentosMovimientoValido);
    }