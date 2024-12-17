
import { generateInitialState } from '../utils/initial_state';
import '../styles/Tablero.css'
import Casilla from './Casilla';
import { useState } from 'react';
import { nuevaPosicionTablero } from '../utils/validadores_movimiento';
import { CasillaType } from '../utils/initial_state';
import { movimientoValido } from '../utils/flujo_validacion';

export default function Tablero() {
    const [posicionTablero, setPosicionTablero] = useState(generateInitialState());
    const [estaPresionada, setEstaPresionada]=useState(false);
    const [casillaOrigen, setCasillaOrigen]=useState<CasillaType>(
    {
        color:'',
        columna: 0,
        fila:0,
        numero:0,
        pieza:'',
        colorPieza:''
    });



    function logicaMovimientoEsValido(casillaOrigen:any,posicionTablero:any,casillaDestino:CasillaType){
        if (movimientoValido(casillaOrigen,posicionTablero,casillaDestino)){
            setPosicionTablero(nuevaPosicionTablero(casillaOrigen,posicionTablero,casillaDestino))
            console.log('movimiento valido');
        }
    }
    function logicaMemoriaPiezaTocada(casillaPresionada:CasillaType){
        setCasillaOrigen({
            color:casillaPresionada.color,
            columna: casillaPresionada.columna,
            fila:casillaPresionada.fila,
            numero:casillaPresionada.numero,
            pieza:casillaPresionada.pieza,
            colorPieza:casillaPresionada.colorPieza
        })
    }

    //hay que pasar toda la casilla
    function pulsacionEnTablero(casillaPresionada:CasillaType){

        if (estaPresionada){
            setEstaPresionada(false);
            logicaMovimientoEsValido(casillaOrigen,posicionTablero,casillaPresionada);
        }
        else{
            if (casillaPresionada.pieza){
                setEstaPresionada(true);
                logicaMemoriaPiezaTocada(casillaPresionada);}
            }
    }
    const casillas=posicionTablero.map((casilla, index) => {
        return (
            <Casilla 
            color={casilla.color} 
            numeroCasilla={casilla.numero}
            pieza={casilla.pieza}
            colorPieza={casilla.colorPieza}
            columna={casilla.columna}
            fila={casilla.fila}
            pulsacionEnTablero={pulsacionEnTablero}
            key={'casilla'+index}></Casilla>
        )
    })
    return (

            <div className='tablero'>
                {casillas}
            </div>
        
    )
  }