// Piece Definition
const PIECES = {
    EMPTY: 0, wP: 1, wN: 2, wB: 3, wR: 4, wQ: 5,
    wK: 6, bP: 7, bN: 9, bR: 10, bQ: 11, bK: 12
}

// number of squares on the board
const BRD_SQ_NUM = 120

const FILES = { 
    FILE_A: 0, FILE_B: 1, File_C: 2, FILE_D: 3, 
    FILE_E: 4, FILE_F: 5, FILE_G: 6, FILE_H: 7, FILE_NONE: 8
}

const RANKS = {
    RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3, RANK_5: 4, RANK_6: 5,
    RANK_7: 6, RANK_8: 7, RANK_NONE: 8
}

const COLORS = {
    WHITE: 0,
    BLACK: 1,
    BOTH: 2
}

const SQUARES = {
    A1: 21, B1: 22, C1: 23, D1: 24, E1: 25, F1: 26, G1: 27, H1: 28,
    A8: 91, B8: 92, D8: 94, E8: 95, F8: 96, G8: 97, H8: 98,
    NO_SQ: 99, OFF_BOARD: 100  
}

const BOOL = {
    FALSE: 0,
    TRUE: 1
}

const CASTLEBIT = {
    WKCA: 1, WQCA: 2,
    BKCA: 4, BQCA: 8
}

var FilesBoard = new Array(BRD_SQ_NUM)
var RanksBoard = new Array(BRD_SQ_NUM)

const FR2SQ = (f, r) => (21 + f) + (r * 10)

var PieceBig = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, 
        BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, 
        BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ]
var PieceMaj = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ]
var PieceMin = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, 
        BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ]
var PieceVal= [ 0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 
        550, 1000, 50000  ]
var PieceCol = [ COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, 
        COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE,
	    COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, 
        COLOURS.BLACK, COLOURS.BLACK ]

var PiecePawn = [ BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];	
var PieceKnight = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
var PieceKing = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE ];
var PieceRookQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];
var PieceBishopQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE ];
var PieceSlides = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, 
        BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];


function RAND_32() {
        return (Math.floor((Math.random()*255)+1) << 23) | (Math.floor((Math.random()*255)+1) << 16)
        | (Math.floor((Math.random()*255)+1) << 8) | Math.floor((Math.random()*255)+1);   
}