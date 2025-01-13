import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CasillaInterface,Casilla } from '../../interfaces/casilla';
import { TableroInterface } from '../../interfaces/Tablero';
import { MovimientosEspecialesInterface } from '../../interfaces/movimientosEspeciales';
import { generateInitialState } from '../../utils/initial_state';
import { COLOR_PIEZA } from '../../constants';
interface EstadoPartida{
    hayPiezaPresionada:boolean,
    turno:number,
    casillaPresionada:CasillaInterface
    posicionTablero:TableroInterface
    movimientosEspeciales:MovimientosEspecialesInterface
}
const estadoInicialPartida:EstadoPartida={
    hayPiezaPresionada:false,
    turno:0,
    casillaPresionada:new Casilla({
      color:'',
      columna: 0,
      fila:0,
      numero:0,
      pieza:'',
      colorPieza:''
    }),
    posicionTablero:generateInitialState(),
    movimientosEspeciales:{
        alPaso:[]
    }
}
export const estadoPartidaSlice = createSlice({
  name: 'estadorPartida',
  initialState: estadoInicialPartida,
  reducers: {
    soltarPieza: state => {
      state.hayPiezaPresionada=false
    },
    tocarPieza: (state,action) => {
      state.hayPiezaPresionada = true
      state.casillaPresionada=action.payload
    },
    actualizarPosicionTablero:(state,action)=>{
        state.posicionTablero=state.posicionTablero.updateTableroAfterMovement(action.payload.piezaTocada,action.payload.casillaDestino) 
        state.turno++
    },
    actualizarMovimientosEspeciales:(state,action)=>{
        state.movimientosEspeciales.alPaso=action.payload
    }
  }
})
export const selectPiezaEstaTocada=(state:RootState)=>state.estadoPartida.hayPiezaPresionada
export const selectTurno=(state:RootState)=>state.estadoPartida.turno
export const selecPiezaTocada=(state:RootState)=>state.estadoPartida.casillaPresionada
export const selectPosicionTablero=(state:RootState)=>state.estadoPartida.posicionTablero
export const selectSiguienteJugador=(state:RootState)=>state.estadoPartida.turno%2===0?COLOR_PIEZA.BLANCO:COLOR_PIEZA.NEGRO
export const selectCasillaAlPaso=(state:RootState)=>state.estadoPartida.movimientosEspeciales
// Action creators are generated for each case reducer function
export const { soltarPieza, tocarPieza, actualizarPosicionTablero, actualizarMovimientosEspeciales } = estadoPartidaSlice.actions

export default estadoPartidaSlice.reducer