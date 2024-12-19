export interface CasillaInterface {
    getColor():string;
    getColumna():number
    getFila():number
    getNumero():number    
    getPieza():string
    getColorPieza():string;
    setPieza(pieza:string):void
    setColorPieza(colorPieza:string):void
    setPiezaConColor(color:string,pieza:string):void
  }
interface CasillaParams{
    color?:string
    columna:number
    fila:number
    numero?:number
    pieza?:string
    colorPieza?:string
}
export class Casilla implements CasillaInterface{
    private color: string;
    private columna: number;
    private fila: number;
    private numero: number;
    private pieza: string;
    private colorPieza: string;
    constructor(casillaParams:CasillaParams){
        this.color=casillaParams.color||'';
        this.columna=casillaParams.columna;
        this.fila=casillaParams.fila;
        this.numero=casillaParams.numero||0;
        this.pieza=casillaParams.pieza||''
        this.colorPieza=casillaParams.colorPieza||''
    }

    getColor():string{
        return this.color
    }
    getColumna():number{
        return this.columna
    }
    getFila():number{
        return this.fila
    }
    getNumero():number{
        return this.numero
    }
    getPieza():string{
        return this.pieza
    }
    getColorPieza():string{
        return this.colorPieza
    }
    setPieza(pieza:string){
        this.pieza=pieza
    }
    setColorPieza(colorPieza:string){
        this.colorPieza=colorPieza
    }
    setPiezaConColor(colorPieza:string,pieza:string){
        this.setColorPieza(colorPieza)
        this.setPieza(pieza)
    }
}