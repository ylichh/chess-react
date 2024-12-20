
import { generateInitialState } from '../utils/initial_state';
import '../styles/Tablero.css'
import CasillaTag from './Casilla';
import { Casilla, CasillaInterface } from '../interfaces/casilla';
import { TableroInterface } from '../interfaces/Tablero';
import { useState } from 'react';
import { nuevaPosicionTablero } from '../utils/validadores_movimiento';
import { movimientoValido } from '../utils/flujo_validacion';

export default function TableroTag() {
    const [posicionTablero, setPosicionTablero] = useState<TableroInterface>(generateInitialState());
    const [estaPresionada, setEstaPresionada]=useState(false);
    const [casillaOrigen, setCasillaOrigen]=useState<CasillaInterface>(
    new Casilla({
        color:'',
        columna: 0,
        fila:0,
        numero:0,
        pieza:'',
        colorPieza:''
    }));



    function logicaMovimientoEsValido(casillaOrigen:CasillaInterface,posicionTablero:TableroInterface,casillaDestino:CasillaInterface){
        if (movimientoValido(casillaOrigen,posicionTablero,casillaDestino)){
            setPosicionTablero(nuevaPosicionTablero(casillaOrigen,posicionTablero,casillaDestino))
            console.log('movimiento valido');
        }
    }
    function logicaMemoriaPiezaTocada(casillaPresionada:CasillaInterface){
        setCasillaOrigen(casillaPresionada);
    }

    //hay que pasar toda la casilla
    function pulsacionEnTablero(casillaPresionada:CasillaInterface){

        if (estaPresionada){
            setEstaPresionada(false);
            logicaMovimientoEsValido(casillaOrigen,posicionTablero,casillaPresionada);
        }
        else{
            if (casillaPresionada.getPieza()){
                setEstaPresionada(true);
                logicaMemoriaPiezaTocada(casillaPresionada);}
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

            <div className='tablero'>
                {casillas}
            </div>
        
    )
  }