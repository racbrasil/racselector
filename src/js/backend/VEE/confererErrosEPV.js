/*
function confereErroTCond(fluido, tCond) {

    const listaTCond = Object.keys(TabelaVEE['EPV01'][fluido]).sort((a, b) => a - b);
    const tamanho = (listaTCond.length) - 1;

    const menorValorTCond = listaTCond[0];
    const maiorValorTCond = listaTCond[tamanho];

    if(tCond > maiorValorTCond || tCond < menorValorTCond) return 'erro'

    return 'success'
}
*/