const tabelaTEvapDensidadeRefrigerante = require('./tabelaTEvapDensidadeRefrigerante');
const tabelaTCondDensidadeRefrigerante = require('./tabelaTCondDensidadeRefrigerante');
const tabelaTEvapPressure = require('./tabelaTEvapPressure');
const tabelaTCondPressure = require('./tabelaTCondPressure');
const tabelaTanqueLiquido = require('./tabelaTanqueLiquido')

function interpolizer(x, x0, x1, y0, y1) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

function encontrarValoresAdjacentes(valor, tabela) {

    const valoresInTable = Object.keys(tabela).map(Number).sort((a, b) => a - b);
    const tamanhoArray = valoresInTable.length - 1;

    for (let i = tamanhoArray; i >= 0; i--) {

        if (valor <= valoresInTable[i] && valor >= valoresInTable[i - 1]) {
            return { maior: valoresInTable[i], menor: valoresInTable[i - 1] };
        }

        if (valor <= valoresInTable[i] && valoresInTable[i - 1] === undefined) {
            return { maior: valoresInTable[i], menor: valoresInTable[i] };
        }

    }

}

function getVolume(diametro, comprimento) {
    return (3.14159265359 * ((diametro / 2000) ** 2) * comprimento) * 1000;
}

function getMassaCondensador(condVol, tCond, fluido) {

    const liquidoCondensador = 0.60;
    const valoresAdjacentes = encontrarValoresAdjacentes(tCond, tabelaTCondDensidadeRefrigerante[fluido]);

    const densidadeLiquidaRefrigerante = interpolizer(tCond, valoresAdjacentes.menor, valoresAdjacentes.maior, tabelaTCondDensidadeRefrigerante[fluido][valoresAdjacentes.menor].liquid, tabelaTCondDensidadeRefrigerante[fluido][valoresAdjacentes.maior].liquid);
    const densidadeVaporRefrigerante = interpolizer(tCond, valoresAdjacentes.menor, valoresAdjacentes.maior, tabelaTCondDensidadeRefrigerante[fluido][valoresAdjacentes.menor].vapor, tabelaTCondDensidadeRefrigerante[fluido][valoresAdjacentes.maior].vapor);

    const massaCondensadorLiquido = condVol * liquidoCondensador * densidadeLiquidaRefrigerante;
    const massaCondesadorVapor = condVol * (1 - liquidoCondensador) * densidadeVaporRefrigerante;

    return (massaCondensadorLiquido + massaCondesadorVapor);
}

function getMassaEvaporador(evapVol, tEvap, fluido) {

    const liquidoEvaporador = 0.20;
    const valoresAdjacentes = encontrarValoresAdjacentes(tEvap, tabelaTEvapDensidadeRefrigerante[fluido]);

    const densidadeLiquidaRefrigerante = interpolizer(tEvap, valoresAdjacentes.menor, valoresAdjacentes.maior, tabelaTEvapDensidadeRefrigerante[fluido][valoresAdjacentes.menor].liquid, tabelaTEvapDensidadeRefrigerante[fluido][valoresAdjacentes.maior].liquid);
    const densidadeVaporRefrigerante = interpolizer(tEvap, valoresAdjacentes.menor, valoresAdjacentes.maior, tabelaTEvapDensidadeRefrigerante[fluido][valoresAdjacentes.menor].vapor, tabelaTEvapDensidadeRefrigerante[fluido][valoresAdjacentes.maior].vapor);

    const massaEvaporadorLiquido = evapVol * liquidoEvaporador * densidadeLiquidaRefrigerante;
    const massaEvaporadorVapor = evapVol * (1 - liquidoEvaporador) * densidadeVaporRefrigerante;

    return (massaEvaporadorLiquido + massaEvaporadorVapor);
}

function getMassaLinhaLiquido(linhaLiquidoVol, fluido) {

    const temperaturaAmbiente = 40;
    const massaLinhaLiquido = linhaLiquidoVol * tabelaTCondDensidadeRefrigerante[fluido][temperaturaAmbiente].liquid;
    return massaLinhaLiquido;

}

function getMassaLinhaSuccao(linhaSuccaoVol, tEvap, fluido) {

    const superaquecimento = 10;
    const valoresAdjacentesTEvap = encontrarValoresAdjacentes(tEvap, tabelaTEvapDensidadeRefrigerante[fluido]);
    const pressureOfTEvap = interpolizer(tEvap, valoresAdjacentesTEvap.menor, valoresAdjacentesTEvap.maior, tabelaTEvapDensidadeRefrigerante[fluido][valoresAdjacentesTEvap.menor].pressure, tabelaTEvapDensidadeRefrigerante[fluido][valoresAdjacentesTEvap.maior].pressure)

    const valoresAdjacentesPressure = encontrarValoresAdjacentes(pressureOfTEvap, tabelaTEvapPressure[fluido])
    const valorBusca = tEvap + superaquecimento;

    const valoresAdjacentesBusca = encontrarValoresAdjacentes(valorBusca, tabelaTEvapDensidadeRefrigerante[fluido]);

    const volWithMinPressure = interpolizer(valorBusca, valoresAdjacentesBusca.menor, valoresAdjacentesBusca.maior, tabelaTEvapPressure[fluido][valoresAdjacentesPressure.menor][valoresAdjacentesBusca.menor], tabelaTEvapPressure[fluido][valoresAdjacentesPressure.menor][valoresAdjacentesBusca.maior])
    const volWithMaxPressure = interpolizer(valorBusca, valoresAdjacentesBusca.menor, valoresAdjacentesBusca.maior, tabelaTEvapPressure[fluido][valoresAdjacentesPressure.maior][valoresAdjacentesBusca.menor], tabelaTEvapPressure[fluido][valoresAdjacentesPressure.maior][valoresAdjacentesBusca.maior])

    const volumeOfTEvap = interpolizer(pressureOfTEvap, valoresAdjacentesPressure.menor, valoresAdjacentesPressure.maior, volWithMinPressure, volWithMaxPressure) * 1000;
    const massaLinhaSuccao = (linhaSuccaoVol / volumeOfTEvap);

    return massaLinhaSuccao;
}

function getMassaLinhaDesc(linhaDescVol, tCond, fluido) {

    const tCondValoresAdjacentes = encontrarValoresAdjacentes(tCond, tabelaTCondDensidadeRefrigerante[fluido]);
    const pressureTCond = interpolizer(tCond, tCondValoresAdjacentes.menor, tCondValoresAdjacentes.maior, tabelaTCondDensidadeRefrigerante[fluido][tCondValoresAdjacentes.menor].pressure, tabelaTCondDensidadeRefrigerante[fluido][tCondValoresAdjacentes.maior].pressure);
    const pressureValoresAdjacentes = encontrarValoresAdjacentes(pressureTCond, tabelaTCondPressure[fluido]);

    const volumeOfTCond = interpolizer(pressureTCond, pressureValoresAdjacentes.menor, pressureValoresAdjacentes.maior, tabelaTCondPressure[fluido][pressureValoresAdjacentes.menor][70], tabelaTCondPressure[fluido][pressureValoresAdjacentes.maior][70]) * 1000;

    const massaLinhaDesc = linhaDescVol / volumeOfTCond;
    return massaLinhaDesc;
}

function selecionaTanqueLiquido(fluido, tCond, tEvap, volEvap, volCond, diamLinhaSuc, compLinhaSuc, diamLinhaLiq, compLinhaLiq, diamLinhaDesc, compLinhaDesc, minEnchimento) {

    const massaEvaporador = getMassaEvaporador(volEvap, tEvap, fluido);
    const massaCondensador = getMassaCondensador(volCond, tCond, fluido);
    const massaLinhaSuc = getMassaLinhaSuccao(getVolume(diamLinhaSuc, compLinhaSuc), tEvap, fluido);
    const massaLinhaLiquido = getMassaLinhaLiquido(getVolume(diamLinhaLiq, compLinhaLiq), fluido);
    const massaLinhaDesc = getMassaLinhaDesc(getVolume(diamLinhaDesc, compLinhaDesc), tCond, fluido);

    const densidadeLiquidoSaturadoTAmbiente = tabelaTEvapDensidadeRefrigerante[fluido][45].liquid;
    const massaTotal = (massaEvaporador + massaCondensador + massaLinhaLiquido + massaLinhaSuc + massaLinhaDesc);
    
    const volumeMassaTotal = massaTotal / densidadeLiquidoSaturadoTAmbiente;

    if (volumeMassaTotal < 4) return { code: 300, message: 'Limites inferiores de fluido ultrapassados.' }

    for (let volume in tabelaTanqueLiquido) {
        if (volumeMassaTotal < (volume * (1 - (0.2 + minEnchimento)))) {
            return {
                code: 200,
                message: {
                    modelo: tabelaTanqueLiquido[volume].modelo,
                    codigo: tabelaTanqueLiquido[volume].codigo,
                    entrada: tabelaTanqueLiquido[volume].entrada,
                    saida: tabelaTanqueLiquido[volume].saida,
                    altura: tabelaTanqueLiquido[volume].altura,
                    diametro: tabelaTanqueLiquido[volume].diametro,
                    volume: volume,
                    massaEnchimento: massaTotal * (1 + minEnchimento),
                }
            }
        }
    }

    return { code: 300, message: 'Nenhum Tanque de Liquido encontrado.' }
}

module.exports = selecionaTanqueLiquido;
//console.log(selecionaTanqueLiquido('R404A', 45, -10, 28, 7.5, 35, 10, 18, 10, 18, 3, 0.10));