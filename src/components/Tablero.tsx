
import '../styles/Tablero.css'
import CasillaTag from './Casilla';
import { CasillaInterface } from '../interfaces/casilla';
import { TableroInterface } from '../interfaces/Tablero';

import { movimientoValido } from '../utils/flujo_validacion';
import { calcularMovimientosEspeciales } from '../utils/calcular_movimientos_especiales';
//redux
//setup
import { useAppSelector,useAppDispatch } from '../redux/hooks';
//slices
import {actualizarPosicionTablero, actualizarMovimientosEspeciales, tocarPieza, soltarPieza, selecPiezaTocada,selectPosicionTablero,selectSiguienteJugador,selectPiezaEstaTocada,selectCasillaAlPaso } from '../redux/slices/partida';
export default function TableroTag() {

    const hayPiezaTocada=useAppSelector(selectPiezaEstaTocada)
    const piezaTocada=useAppSelector(selecPiezaTocada)
    const siguienteJugador=useAppSelector(selectSiguienteJugador)
    const posicionEnTablero=useAppSelector(selectPosicionTablero)
    const movimientosEspeciales=useAppSelector(selectCasillaAlPaso)
    const dispatch=useAppDispatch()


    function handlePiezaSoltada(casillaDestino:CasillaInterface){
        if (movimientoValido(
            {
                casillaOrigen:piezaTocada,
                posicionTablero:posicionEnTablero,
                casillaDestino:casillaDestino,
                siguienteJugador:siguienteJugador,
                movimientosEspeciales:movimientosEspeciales
            })
        ){
            dispatch(actualizarPosicionTablero({piezaTocada:piezaTocada,casillaDestino:casillaDestino}))
            dispatch(actualizarMovimientosEspeciales(calcularMovimientosEspeciales({piezaTocada,casillaDestino})))
        }
        dispatch(soltarPieza())
    }
    

    function handlePiezaTocada(casillaPresionada:CasillaInterface){
        dispatch(tocarPieza(casillaPresionada))
    }
    //hay que pasar toda la casilla
    function pulsacionEnTablero(casillaPresionada:CasillaInterface){

            if (hayPiezaTocada){
                handlePiezaSoltada(casillaPresionada);
            }
            else{
                if (casillaPresionada.getPieza()){
                    handlePiezaTocada(casillaPresionada)
                }
            }
        

    }
    const casillas=posicionEnTablero.getCasillas().map((casilla, index) => {
        
        return (
            <CasillaTag 
            color={casilla.getColor()} 
            numeroCasilla={casilla.getNumero()}
            pieza={casilla.getPieza()}
            colorPieza={casilla.getColorPieza()}
            columna={casilla.getColumna()}
            fila={casilla.getFila()}
            pulsacionEnTablero={pulsacionEnTablero}
            key={'casilla'+index}></CasillaTag>
        )
    })
    return (
        //meter esto en app?
            <div>  
                <div>
                    {hayPiezaTocada?'Hay pieza tocada':'No hay pieza tocada'}
                </div>
                <div>
                    Juega el jugador {siguienteJugador}
                </div>

            <div className='tablero'>
                {casillas}
            </div>
            </div>
    )
  }