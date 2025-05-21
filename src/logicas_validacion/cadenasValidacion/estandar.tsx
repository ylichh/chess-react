import { JugadorPermitido } from '../evaluadores';
import { RangoEvaluador } from '../evaluadores';
import { DireccionEvaluador } from '../evaluadores';
import { CaminoLibreEvaluador } from '../evaluadores';
import { CasillaOcupable } from '../evaluadores';
import { MovimientoValidoArgumentos } from '../evaluadorInterfaz';
import { EstrategiaValidacion } from '../validarMovimiento';

export const validadorEstandar: EstrategiaValidacion = (argumentosMovimientoValido: MovimientoValidoArgumentos) => {
  console.log('Se ejecuta el validador estandar');
  const jugadorPermitido = new JugadorPermitido();
  const rangoEvaluador = new RangoEvaluador();
  const direccionEvaluador = new DireccionEvaluador();
  const caminoLibreEvaluador = new CaminoLibreEvaluador();
  const casillaOcupableEvaluador = new CasillaOcupable();
  jugadorPermitido.siguienteCondicion(rangoEvaluador).siguienteCondicion(direccionEvaluador).siguienteCondicion(caminoLibreEvaluador).siguienteCondicion(casillaOcupableEvaluador);
  return jugadorPermitido.evaluar(argumentosMovimientoValido);
};
