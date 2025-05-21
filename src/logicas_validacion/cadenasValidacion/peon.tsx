import { EstrategiaValidacion } from '../validarMovimiento';
import { MovimientoValidoArgumentos } from '../evaluadorInterfaz';
import { JugadorPermitido } from '../evaluadores';
import { RangoEvaluador } from '../evaluadores';
import { CasillaOcupable } from '../evaluadores';

export const validadorPeon: EstrategiaValidacion = (argumentosMovimientoValido: MovimientoValidoArgumentos) => {
  console.log('Se ejecuta el validador de peon', argumentosMovimientoValido);
  const jugadorPermitido = new JugadorPermitido();
  const rangoEvaluador = new RangoEvaluador();
  const casillaOcupableEvaluador = new CasillaOcupable();
  jugadorPermitido.siguienteCondicion(rangoEvaluador).siguienteCondicion(casillaOcupableEvaluador);
  return jugadorPermitido.evaluar(argumentosMovimientoValido);
};
