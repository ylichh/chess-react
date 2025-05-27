import { JugadorPermitido } from '../evaluadores';
import { RangoEvaluador } from '../evaluadores';

import { CasillaOcupable } from '../evaluadores';
import { MovimientoValidoArgumentos } from '../evaluadorInterfaz';
import { EstrategiaValidacion } from '../validarMovimiento';

export const validadorCaballo: EstrategiaValidacion = (argumentosMovimientoValido: MovimientoValidoArgumentos) => {
  console.log('Se ejecuta el validador estandar');
  const jugadorPermitido = new JugadorPermitido();
  const rangoEvaluador = new RangoEvaluador();
  const casillaOcupableEvaluador = new CasillaOcupable();
  jugadorPermitido.siguienteCondicion(rangoEvaluador).siguienteCondicion(casillaOcupableEvaluador);
  return jugadorPermitido.evaluar(argumentosMovimientoValido);
};
