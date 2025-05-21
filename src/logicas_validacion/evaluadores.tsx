import { PIEZAS, PIEZAS_DE_RANGO, PIEZAS_DE_DIRECCION, PIEZAS_CAMINO_LIBRE } from '../constants';
import { caminoLibre } from '../utils/validadores_movimiento';
import { movimientoEnRango } from '../utils/validadores_rango';
import { direccionPosible } from '../utils/validador_direccion';
import { esComestible, casillaOcupada } from '../utils/utilidades';

import { AbstractMovimientoHandler } from './evaluadorInterfaz';
import { MovimientoValidoArgumentos } from './evaluadorInterfaz';
export class RangoEvaluador extends AbstractMovimientoHandler {
  //ver si lo debe evaluar. si es asi lo evaluas, si falla return false, si no falla, que pase al siguiente, si no debe evaluarlo que pase al siguiente
  public evaluar(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean {
    if (PIEZAS_DE_RANGO.includes(argumentosMovimientosValidos.casillaOrigen.getPieza() as PIEZAS)) {
      console.log('rango');
      if (
        movimientoEnRango({
          casillaOrigen: argumentosMovimientosValidos.casillaOrigen,
          casillaDestino: argumentosMovimientosValidos.casillaDestino,
          posicionTablero: argumentosMovimientosValidos.posicionTablero,
          movimientosEspeciales: argumentosMovimientosValidos.movimientosEspeciales,
        })
      ) {
        return super.evaluar(argumentosMovimientosValidos);
      } else {
        return false;
      }
    }
    return super.evaluar(argumentosMovimientosValidos);
  }
}

export class DireccionEvaluador extends AbstractMovimientoHandler {
  public evaluar(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean {
    if (PIEZAS_DE_DIRECCION.includes(argumentosMovimientosValidos.casillaOrigen.getPieza() as PIEZAS)) {
      console.log('direccion');
      if (direccionPosible(argumentosMovimientosValidos.casillaOrigen, argumentosMovimientosValidos.casillaDestino)) {
        return super.evaluar(argumentosMovimientosValidos);
      } else {
        return false;
      }
    }
    return super.evaluar(argumentosMovimientosValidos);
  }
}

export class CaminoLibreEvaluador extends AbstractMovimientoHandler {
  public evaluar(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean {
    if (PIEZAS_CAMINO_LIBRE.includes(argumentosMovimientosValidos.casillaOrigen.getPieza() as PIEZAS)) {
      console.log('camino libre');
      if (caminoLibre(argumentosMovimientosValidos.casillaOrigen, argumentosMovimientosValidos.casillaDestino, argumentosMovimientosValidos.posicionTablero)) {
        return super.evaluar(argumentosMovimientosValidos);
      } else {
        return false;
      }
    }
    return super.evaluar(argumentosMovimientosValidos);
  }
}

export class CasillaOcupable extends AbstractMovimientoHandler {
  public evaluar(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean {
    console.log('casilla ocupada');
    if (casillaOcupada(argumentosMovimientosValidos.casillaDestino)) {
      return this.casillaOcupadaEvaluacion(argumentosMovimientosValidos);
    } else {
      return super.evaluar(argumentosMovimientosValidos);
    }
  }
  public casillaOcupadaEvaluacion(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean {
    if (esComestible(argumentosMovimientosValidos.casillaOrigen, argumentosMovimientosValidos.casillaDestino)) {
      return super.evaluar(argumentosMovimientosValidos);
    } else {
      return false;
    }
  }
}

export class JugadorPermitido extends AbstractMovimientoHandler {
  public evaluar(argumentosMovimientosValidos: MovimientoValidoArgumentos): boolean {
    if (argumentosMovimientosValidos.casillaOrigen.getColorPieza() !== argumentosMovimientosValidos.siguienteJugador) {
      return false;
    }
    return super.evaluar(argumentosMovimientosValidos);
  }
}
