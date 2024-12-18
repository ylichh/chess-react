
import '../styles/Casilla.css'

import { PIEZA_PNG } from '../utils/imagen_dispatcher';
import { useState } from 'react';
import { Casilla } from '../interfaces/casilla';
const CASILLA_COLORES: { [key: string]: string } = {
    casilla_negra:'negra',
    casilla_blanca:'blanca',
};

export default function CasillaTag({color,numeroCasilla,pieza,colorPieza,columna,fila,pulsacionEnTablero}:any) {
    const imagenPieza = PIEZA_PNG[pieza] ;
    const [sombreado, setSombreado]=useState(false);
    function sombrear(){
        setSombreado(!sombreado);
    }
    function casillaPresionada(){
        const casillaPresionada:Casilla=new Casilla({
            color:color,
            columna:columna,
            fila:fila,
            numero:numeroCasilla,
            pieza:pieza,
            colorPieza:colorPieza
        })
        pulsacionEnTablero(casillaPresionada);
    }
    return (
        <div 
        className={'casilla ' + CASILLA_COLORES[color] + ' '+ numeroCasilla + ' ' + (sombreado ? 'sombreado' : '')} 
        onClick={casillaPresionada}
        onMouseEnter={sombrear}
        onMouseLeave={sombrear}>
            <img src={imagenPieza} alt="" /> 
        </div>
    )
    
  }