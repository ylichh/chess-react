
import peonBlanco from '../assets/imagenes/piezas/peon_blanco.png';
import peonNegro from '../assets/imagenes/piezas/peon_negro.png';
import torreBlanca from '../assets/imagenes/piezas/torre_blanca.png';
import torreNegra from '../assets/imagenes/piezas/torre_negra.png';
import caballoBlanco from '../assets/imagenes/piezas/caballo_blanco.png';
import caballoNegro from '../assets/imagenes/piezas/caballo_negro.png';
import alfilBlanco from '../assets/imagenes/piezas/alfil_blanco.png';
import alfilNegro from '../assets/imagenes/piezas/alfil_negro.png';
import reinaBlanca from '../assets/imagenes/piezas/reina_blanca.png';
import reinaNegra from '../assets/imagenes/piezas/reina_negra.png';
import reyBlanco from '../assets/imagenes/piezas/rey_blanco.png';
import reyNegro from '../assets/imagenes/piezas/rey_negro.png';
import { PIEZAS } from '../constants';

export const PIEZA_PNG: { [key: string]: string } = {
    [PIEZAS.PEON_BLANCO]: peonBlanco,
    [PIEZAS.PEON_NEGRO]: peonNegro,
    [PIEZAS.TORRE_BLANCA]: torreBlanca,
    [PIEZAS.TORRE_NEGRA]: torreNegra,
    [PIEZAS.CABALLO_BLANCO]: caballoBlanco,
    [PIEZAS.CABALLO_NEGRO]: caballoNegro,
    [PIEZAS.ALFIL_BLANCO]: alfilBlanco,
    [PIEZAS.ALFIL_NEGRO]: alfilNegro,
    [PIEZAS.REINA_BLANCA]: reinaBlanca,
    [PIEZAS.REINA_NEGRA]: reinaNegra,
    [PIEZAS.REY_BLANCO]: reyBlanco,
    [PIEZAS.REY_NEGRO]: reyNegro
};