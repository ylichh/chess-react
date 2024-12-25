//casillas
export const CASILLAS_DATA={
    CASILLA_NEGRA: 'casilla_negra',
    CASILLA_BLANCA: 'casilla_blanca',
}
export enum PIEZAS{
    PEON_BLANCO='peon_blanco',
    PEON_NEGRO='peon_negro',
    TORRE_BLANCA='torre_blanca',
    CABALLO_BLANCO= 'caballo_blanco',
    CABALLO_NEGRO= 'caballo_negro',
    ALFIL_BLANCO= 'alfil_blanco',
    ALFIL_NEGRO='alfil_negro',
    REINA_BLANCA= 'reina_blanca',
    REINA_NEGRA= 'reina_negra',
    REY_BLANCO='rey_blanco',
    REY_NEGRO='rey_negro',
    TORRE_NEGRA= 'torre_negra'
}
export enum COLOR_PIEZA{
    BLANCO='blanco',
    NEGRO='negro'
}

export enum DIRECCIONES{
    HORIZONTAL="horizontal",
    VERTICAL="vertical",
    DIAGONAL_POSITIVA="diagonal_positiva",
    DIAGONAL_NEGATIVA="diagonal_negativa"
}

export const DIRECCIONES_HORIZONTALES=[
        {sentidoFila:1,sentidoColumna:0},
        {sentidoFila:-1,sentidoColumna:0}
    ]
export const DIRECCIONES_VERTICALES=[
        {sentidoFila:0,sentidoColumna:1},
        {sentidoFila:0,sentidoColumna:-1}
    ]
export const DIRECCIONES_DIAGONALES=[
        {sentidoFila:1,sentidoColumna:1},
        {sentidoFila:1,sentidoColumna:-1},
        {sentidoFila:-1,sentidoColumna:1},
        {sentidoFila:-1,sentidoColumna:-1}
    ]
export const DIRECCIONES_TORRE = [
        ...DIRECCIONES_HORIZONTALES,
        ...DIRECCIONES_VERTICALES
    ];
export const DIRECCIONES_ALFIL = [
        ...DIRECCIONES_DIAGONALES
    ];
export const DIRECCIONES_REINA = [
        ...DIRECCIONES_TORRE,
        ...DIRECCIONES_DIAGONALES
    ];

export const PIEZAS_DE_RANGO=[
    PIEZAS.PEON_BLANCO,
    PIEZAS.PEON_NEGRO,
    PIEZAS.CABALLO_BLANCO,
    PIEZAS.CABALLO_NEGRO,
    PIEZAS.REY_NEGRO,
    PIEZAS.REY_BLANCO
]
export const PIEZAS_DE_DIRECCION=[
    PIEZAS.TORRE_BLANCA,
    PIEZAS.TORRE_NEGRA,
    PIEZAS.ALFIL_BLANCO,
    PIEZAS.ALFIL_NEGRO,
    PIEZAS.REINA_BLANCA,
    PIEZAS.REINA_NEGRA
]
export const PIEZAS_CAMINO_LIBRE=[
    PIEZAS.TORRE_BLANCA,
    PIEZAS.TORRE_NEGRA,
    PIEZAS.ALFIL_BLANCO,
    PIEZAS.ALFIL_NEGRO,
    PIEZAS.REINA_BLANCA,
    PIEZAS.REINA_NEGRA,
    PIEZAS.REY_NEGRO,
    PIEZAS.REY_BLANCO
]

export enum EventosPartida{
    CASILLA_PRESIONADA,
    MOVIMIENTO_VALIDADO,
    ALMACENA_PIEZA
}