
import { generateInitialState } from '../utils/initial_state';
import '../styles/Tablero.css'
import CasillaTag from './Casilla';
import { Casilla, CasillaInterface } from '../interfaces/casilla';
import { TableroInterface } from '../interfaces/Tablero';
import { useState } from 'react';
import { movimientoValido } from '../utils/flujo_validacion';
import { COLOR_PIEZA } from '../constants';
export default function TableroTag() {
    const [posicionTablero, setPosicionTablero] = useState<TableroInterface>(generateInitialState());
    const [casillaOrigen, setCasillaOrigen]=useState<CasillaInterface>(
    new Casilla({
        color:'',
        columna: 0,
        fila:0,
        numero:0,
        pieza:'',
        colorPieza:''
    }));
    //player memory
    const [estadoPartida, setEstadoPartida]=useState({
        turno:0,
        siguienteJugador:COLOR_PIEZA.BLANCO,
        hayPiezaPresionada:false
    })

    function handlePosicionTablero(casillaDestino:CasillaInterface){
        setPosicionTablero(posicionTablero.updateTableroAfterMovement(casillaOrigen,casillaDestino));
    }
    function handleEstadoPartida(){
            setEstadoPartida((estadoPrevio)=>{
                if(estadoPrevio.siguienteJugador===COLOR_PIEZA.BLANCO){
                    return {...estadoPrevio,siguienteJugador:COLOR_PIEZA.NEGRO}
                }else{
                    return {...estadoPrevio,siguienteJugador:COLOR_PIEZA.BLANCO}
                }
            }
        )
    }
    function handleEstaPresionada(estaPresionada:boolean){
        setEstadoPartida((estadoPrevio)=>{
            return({...estadoPrevio,hayPiezaPresionada:estaPresionada})
        })
    }


    function logicaMovimientoEsValido(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface,casillaDestino:CasillaInterface){
        if (movimientoValido(casillaOrigen,posicionTablero,casillaDestino)){
            handlePosicionTablero(casillaDestino)
            handleEstadoPartida()
            //guardar movimiento
            //cambiar turno
            console.log('movimiento valido');
        }
    }
    function handlePiezaTocada(casillaPresionada:CasillaInterface){
        setCasillaOrigen(casillaPresionada);
    }

    //hay que pasar toda la casilla
    function pulsacionEnTablero(casillaPresionada:CasillaInterface){

            if (estadoPartida.hayPiezaPresionada){

                handleEstaPresionada(false)
                logicaMovimientoEsValido(casillaOrigen,posicionTablero,casillaPresionada);
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