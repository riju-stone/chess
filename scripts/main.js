const InitFilesRankBoard = () => {
    let index = 0
    let file = FILES.FILE_A
    let rank = RANKS.RANK_1
    let sq = SQUARES.A1

    for(index = 0; index < BRD_SQ_NUM; index++){
        FilesBoard[index] = SQUARES.OFF_BOARD
        RanksBoard[index] = SQUARES.OFF_BOARD
    }

    for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++){
        for(files = FILES.FILE_A; files <= FILES.FILE_H; file++){
            sq = FR2SQ(file, rank)
            FilesBoard[sq] = file
            RanksBoard[sq] = rank
        }
    }
}