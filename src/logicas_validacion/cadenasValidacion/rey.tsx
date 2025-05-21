import { EstrategiaValidacion } from '../validarMovimiento';
import { MovimientoValidoArgumentos } from '../evaluadorInterfaz';

export const validadorRey: EstrategiaValidacion = (argumentosMovimientoValido: MovimientoValidoArgumentos) => {
  console.log('Se ejecuta la validacion del rey', argumentosMovimientoValido);
  return true;
};
