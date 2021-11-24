var GameBoard = {}

GameBoard.pieces = new Array(BRD_SQ_NUM)
GameBoard.side = COLORS.WHITE
GameBoard.fiftyMove = 0
GameBoard.hisPly = 0
GameBoard.ply = 0
GameBoard.enPas = 0
GameBoard.castlePerm = 0
GameBoard.material = new Array(2)
GameBoard.pceNum = new Array(13)
GameBoard.pList = new Array(14 * 10)
GameBoard.posKey = 0

