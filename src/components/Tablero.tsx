
import { generateInitialState } from '../utils/initial_state';
import '../styles/Tablero.css'
import CasillaTag from './Casilla';
import { Casilla, CasillaInterface } from '../interfaces/casilla';
import { TableroInterface } from '../interfaces/Tablero';
import { useState } from 'react';
import { movimientoValido } from '../utils/flujo_validacion';
import { COLOR_PIEZA,EventosPartida } from '../constants';
import { EstadoPartidaInterface,EventoPiezaPulsadaInterface,EventoAlmacenaCasilla } from '../states/estadoPartida';
import { partidaReducer } from '../dispatchers/partida-dispatcher';
import { useReducer } from 'react';

export default function TableroTag() {
    const [posicionTablero, setPosicionTablero] = useState<TableroInterface>(generateInitialState());
    const estadoInicialPartida:EstadoPartidaInterface={
        turno:0,
        hayPiezaPresionada:false,
        casillaPresionada:new Casilla({
            color:'',
            columna: 0,
            fila:0,
            numero:0,
            pieza:'',
            colorPieza:''
        })
    }

    const [estadoPartida, estadoPartidaDispatcher]=useReducer(partidaReducer,estadoInicialPartida)

    function handlePosicionTablero(casillaDestino:CasillaInterface){
        setPosicionTablero(posicionTablero.updateTableroAfterMovement(estadoPartida.casillaPresionada,casillaDestino));
    }




    function logicaMovimientoEsValido(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface,casillaDestino:CasillaInterface){
        if (movimientoValido(casillaOrigen,posicionTablero,casillaDestino)){
            handlePosicionTablero(casillaDestino)
            // handleEstadoPartida()
            //guardar movimiento
            //cambiar turno
            console.log('movimiento valido');
        }
    }
    function handlePiezaTocada(casillaPresionada:CasillaInterface){
        estadoPartidaDispatcher(
            {
                type: EventosPartida.ALMACENA_PIEZA,
                casillaPresionada: casillaPresionada
            } as EventoAlmacenaCasilla
        )
    }
    function handleEstaPresionada(estaPresionada:boolean){
        estadoPartidaDispatcher(
            {
                type: EventosPartida.CASILLA_PRESIONADA,
                hayPiezaPresionada: estaPresionada
            } as EventoPiezaPulsadaInterface
        )
    }

    //hay que pasar toda la casilla
    function pulsacionEnTablero(casillaPresionada:CasillaInterface){

            if (estadoPartida.hayPiezaPresionada){
                handleEstaPresionada(false)
                logicaMovimientoEsValido(estadoPartida.casillaPresionada,posicionTablero,casillaPresionada);
            }
            else{
                if (casillaPresionada.getPieza()){
                    handleEstaPresionada(true)
                    handlePiezaTocada(casillaPresionada);}
                }
        

    }
    const casillas=posicionTablero.getCasillas().map((casilla, index) => {
        
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
                    {estadoPartida.siguienteJugador}
                </div>

            <div className='tablero'>
                {casillas}
            </div>
            </div>
    )
  }