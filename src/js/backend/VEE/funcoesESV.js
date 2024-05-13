const TabelaESV = require('./tabelaESV');

function fatores(tEvap, sub, refrigerante) {

    let fatorSub, fatorTEvap;

    fatorTEvap = 1.25;
    switch (refrigerante) {

        case 'R22':

            if (sub <= 4) fatorSub = 1;
            else if (sub > 4 && sub <= 10) fatorSub = 0.94
            else if (sub > 10 && sub <= 15) fatorSub = 0.90
            else if (sub > 15 && sub <= 20) fatorSub = 0.87
            else if (sub > 20 && sub <= 25) fatorSub = 0.83
            else if (sub > 25 && sub <= 30) fatorSub = 0.80
            else if (sub > 30 && sub <= 35) fatorSub = 0.77
            else if (sub > 35 && sub <= 40) fatorSub = 0.74
            else if (sub > 40 && sub <= 45) fatorSub = 0.72
            else if (sub > 45 && sub <= 50) fatorSub = 0.69
            break

        case 'R134A':

            if (sub <= 4) fatorSub = 1;
            else if (sub > 4 && sub <= 10) fatorSub = 0.93
            else if (sub > 10 && sub <= 15) fatorSub = 0.88
            else if (sub > 15 && sub <= 20) fatorSub = 0.84
            else if (sub > 20 && sub <= 25) fatorSub = 0.80
            else if (sub > 25 && sub <= 30) fatorSub = 0.76
            else if (sub > 30 && sub <= 35) fatorSub = 0.73
            else if (sub > 35 && sub <= 40) fatorSub = 0.70
            else if (sub > 40 && sub <= 45) fatorSub = 0.68
            else if (sub > 45 && sub <= 50) fatorSub = 0.65
            break

        case 'R404A':

            if (sub <= 4) fatorSub = 1;
            else if (sub > 4 && sub <= 10) fatorSub = 0.91
            else if (sub > 10 && sub <= 15) fatorSub = 0.83
            else if (sub > 15 && sub <= 20) fatorSub = 0.78
            else if (sub > 20 && sub <= 25) fatorSub = 0.73
            else if (sub > 25 && sub <= 30) fatorSub = 0.68
            else if (sub > 30 && sub <= 35) fatorSub = 0.65
            else if (sub > 35 && sub <= 40) fatorSub = 0.61
            else if (sub > 40 && sub <= 45) fatorSub = 0.59
            else if (sub > 45 && sub <= 50) fatorSub = 0.56
            break

        case 'R507A':

            if (sub <= 4) fatorSub = 1;
            else if (sub > 4 && sub <= 10) fatorSub = 0.91
            else if (sub > 10 && sub <= 15) fatorSub = 0.83
            else if (sub > 15 && sub <= 20) fatorSub = 0.78
            else if (sub > 20 && sub <= 25) fatorSub = 0.73
            else if (sub > 25 && sub <= 30) fatorSub = 0.68
            else if (sub > 30 && sub <= 35) fatorSub = 0.65
            else if (sub > 35 && sub <= 40) fatorSub = 0.61
            else if (sub > 40 && sub <= 45) fatorSub = 0.59
            else if (sub > 45 && sub <= 50) fatorSub = 0.56
            break

        case 'R407C':

            if (sub <= 4) fatorSub = 1;
            else if (sub > 4 && sub <= 10) fatorSub = 0.93
            else if (sub > 10 && sub <= 15) fatorSub = 0.88
            else if (sub > 15 && sub <= 20) fatorSub = 0.83
            else if (sub > 20 && sub <= 25) fatorSub = 0.79
            else if (sub > 25 && sub <= 30) fatorSub = 0.75
            else if (sub > 30 && sub <= 35) fatorSub = 0.72
            else if (sub > 35 && sub <= 40) fatorSub = 0.69
            else if (sub > 40 && sub <= 45) fatorSub = 0.66
            else if (sub > 45 && sub <= 50) fatorSub = 0.64
            break

        case 'R410A':

            if (sub <= 4) fatorSub = 1;
            else if (sub > 4 && sub <= 10) fatorSub = 0.95
            else if (sub > 10 && sub <= 15) fatorSub = 0.90
            else if (sub > 15 && sub <= 20) fatorSub = 0.85
            else if (sub > 20 && sub <= 25) fatorSub = 0.81
            else if (sub > 25 && sub <= 30) fatorSub = 0.77
            else if (sub > 30 && sub <= 35) fatorSub = 0.73
            else if (sub > 35 && sub <= 40) fatorSub = 0.70
            else if (sub > 40 && sub <= 45) fatorSub = 0.67
            else if (sub > 45 && sub <= 50) fatorSub = 0.64
            break

        case 'R744':

            if (sub <= 4) fatorSub = 1;
            else if (sub > 4 && sub <= 10) fatorSub = 0.91
            else if (sub > 10 && sub <= 15) fatorSub = 0.86
            else if (sub > 15 && sub <= 20) fatorSub = 0.81
            else if (sub > 20 && sub <= 25) fatorSub = 0.77
            else if (sub > 25 && sub <= 30) fatorSub = 0.73
            else if (sub > 30 && sub <= 35) fatorSub = 0.69
            else if (sub > 35 && sub <= 40) fatorSub = 0.66
            else if (sub > 40 && sub <= 45) fatorSub = 0.63
            else if (sub > 45 && sub <= 50) fatorSub = 0.60
            break
    }

    return { fatorSub, fatorTEvap }

}

function criaCoordenadasESV(tCond, tEvap, matriz) {
    const coordenadas = {
        // x = tCond, y = tEvap, z = resultado entre eles seguindo a tabela RAC 
        xMin_yMin: {
            x: tCond.min,
            y: tEvap.min,
            z: matriz[tCond.min][tEvap.min]
        },
        xMax_yMin: {
            x: tCond.max,
            y: tEvap.min,
            z: matriz[tCond.max][tEvap.min]
        },
        xMin_yMax: {
            x: tCond.min,
            y: tEvap.max,
            z: matriz[tCond.min][tEvap.max]
        },
        xMax_yMax: {
            x: tCond.max,
            y: tEvap.max,
            z: matriz[tCond.max][tEvap.max]
        }

    }

    return coordenadas

}

function retornaInferiorMaximoESV(tCond, tEvap) {

    const parametrosTCond = [30, 35, 38, 40, 45, 50];
    const parametrosTEvap = [-30, -20, -10, -5, 0, 5, 10];

    for (let i = (parametrosTCond.length - 1); i >= 0; i--) {
        let max, min;

        if (tCond >= parametrosTCond[i]) {

            i == (parametrosTCond.length - 1)
                ? (max = parametrosTCond[i], min = parametrosTCond[i - 1])
                : (max = parametrosTCond[i + 1], min = parametrosTCond[i])

            tCond = {
                max: max,
                min: min
            }

            break;
        }


    }

    for (let i = (parametrosTEvap.length - 1); i >= 0; i--) {
        let max, min;

        if (tEvap >= parametrosTEvap[i]) {

            i == (parametrosTEvap.length - 1)
                ? (max = parametrosTEvap[i], min = parametrosTEvap[i - 1])
                : (max = parametrosTEvap[i + 1], min = parametrosTEvap[i])

            tEvap = {
                max: max,
                min: min
            }

            break;
        }

    }

    return { tEvap, tCond }
}

function interpolizerESV(tCond, tEvap, fluido, valvula) {
    const tCondMaxMin = retornaInferiorMaximoESV(tCond, tEvap).tCond;
    const tEvapMaxMin = retornaInferiorMaximoESV(tCond, tEvap).tEvap;

    const coordenadas = criaCoordenadasESV(tCondMaxMin, tEvapMaxMin, TabelaESV[valvula][fluido]);
    const minTCondInterpolado = coordenadas.xMin_yMin.z +
        (
            (tCond - coordenadas.xMin_yMin.x) *
            (
                (coordenadas.xMax_yMin.z - coordenadas.xMin_yMin.z) /
                (coordenadas.xMax_yMin.x - coordenadas.xMin_yMin.x)
            )
        )

    const maxTCondInterpolado = coordenadas.xMin_yMax.z +
        (
            (tCond - coordenadas.xMin_yMax.x) *
            (
                (coordenadas.xMax_yMax.z - coordenadas.xMin_yMax.z) /
                (coordenadas.xMax_yMax.x - coordenadas.xMin_yMax.x)
            )
        )

    const minTEvapInterpolado = minTCondInterpolado +
        (
            (tEvap - coordenadas.xMin_yMin.y) *
            (
                (maxTCondInterpolado - minTCondInterpolado) /
                (coordenadas.xMin_yMax.y - coordenadas.xMin_yMin.y)
            )
        )

    return minTEvapInterpolado;

}

function selecionaValvulaESV(capacidade, tCond, tEvap, fluido, subres) {

    const fatorSub = fatores(tEvap, subres, fluido).fatorSub
    const fatorTEvap = fatores(tEvap, subres, fluido).fatorTEvap

    const capacidadeFator = capacidade * fatorSub * fatorTEvap;

    if (tCond < 30 || tCond > 50 || tEvap > 10 || tEvap < -30) {
        return 303
    }

    if (fluido != 'R410A' && fluido != 'R407C' && fluido != 'R22' && fluido != 'R134A' && fluido != 'R404A') {
        return 303
    }

    const valvulas = [

        ['ESV13', {
            codigo: '040-997',
            diametro: '1.3',
            kv: '0.060',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '1/4"'
        }],
        ['ESV165', {
            codigo: '040-938',
            diametro: '1.65',
            kv: '0.080',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '1/4"'
        }],
        ['ESV18', {
            codigo: '040-939',
            diametro: '1.8',
            kv: '0.100',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '1/4"'
        }],
        ['ESV20', {
            codigo: '040-999',
            diametro: '2.0',
            kv: '0.160',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '1/4"'
        }],
        ['ESV24', {
            codigo: '040-940',
            diametro: '2.4',
            kv: '0.230',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '1/4"'
        }],
        ['ESV32', {
            codigo: '040-988',
            diametro: '3.2',
            kv: '0.430',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '5/16"'
        }],
        ['ESV40', {
            codigo: '040-989',
            diametro: '4.0',
            kv: '0.500',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '5/8"'
        }],

        ['ESV45', {
            codigo: '040-990',
            diametro: '4.5',
            kv: '0.700',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '5/8"'
        }],
        ['ESV55', {
            codigo: '040-991',
            diametro: '5.5',
            kv: '0.800',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '5/8"'
        }],
        ['ESV65', {
            codigo: '040-992',
            diametro: '6.5',
            kv: '1.100',
            pMaxTrab: '42',
            maxPDifTrab: '34',
            entrada: '5/8"',
            saida: '5/8"'
        }]

    ];

    for (let i = 0; i < (valvulas.length); i++) {
        const capacidadeValvula = interpolizerESV(tCond, tEvap, fluido, valvulas[i][0])
        if (capacidadeValvula > capacidadeFator && ((capacidade * 100) / capacidadeValvula > 40)) {
            const valvula = Object.assign({ tipo: 'Passo', modelo: valvulas[i][0], capacidade: capacidadeValvula, entrada: valvulas[i][1].entrada, saida: valvulas[i][1].saida }, valvulas[i][1])
            return valvula
        }

    }
    // 303 - Nenhuma valvula encontrada
    return 303
}

module.exports = selecionaValvulaESV;