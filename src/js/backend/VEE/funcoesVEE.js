const TabelaVEE = require('./tabelaVEE');

function fatores(tEvap, sub, refrigerante) {

    let fatorSub, fatorTEvap;

    if (tEvap >= -40 && tEvap <= -20) fatorTEvap = 1.5;
    else if (tEvap > -20 && tEvap <= 10) fatorTEvap = 1.25;

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

function criaCoordenadasVEE(tCond, tEvap, matriz) {

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

function retornaInferiorMaximoVEE(tCond, tEvap) {

    const parametrosTCond = [25, 30, 35, 40, 45];
    const parametrosTEvap = [-40, -35, -30, -25, -20, -15, -10, -5, 0, 5];

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

function interpolizerVEE(tCond, tEvap, fluido, orificio) {

    const tCondMaxMin = retornaInferiorMaximoVEE(tCond, tEvap).tCond;
    const tEvapMaxMin = retornaInferiorMaximoVEE(tCond, tEvap).tEvap;

    const coordenadas = criaCoordenadasVEE(tCondMaxMin, tEvapMaxMin, TabelaVEE[orificio][fluido]);
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

function selecionaValvulaVEE(capacidade, tCond, tEvap, fluido, subres) {

    const fatorSub = fatores(tEvap, subres, fluido).fatorSub
    const fatorTEvap = fatores(tEvap, subres, fluido).fatorTEvap

    const capacidadeFator = capacidade * fatorSub * fatorTEvap;

    if (tCond < 25 || tCond > 45 || tEvap > 5 || tEvap < -40) {
        return 303
    }

    if (fluido != 'R22' && fluido != 'R404A' && fluido != 'R507A' && fluido != 'R134A' && fluido != 'R407C' && fluido != 'R744') {
        return 303
    }

    const orificios = [

        ['EPV01', {
            codigo: '040-951',
            kv: '0.003',
            entrada: '3/8"',
            saida: '1/2"'
        }],
        ['EPV02', {
            codigo: '040-952',
            kv: '0.010',
            entrada: '3/8"',
            saida: '1/2"'
        }],
        ['EPV03', {
            codigo: '040-953',
            kv: '0.017',
            entrada: '3/8"',
            saida: '1/2"'
        }],
        ['EPV04', {
            codigo: '040-954',
            kv: '0.025',
            entrada: '3/8"',
            saida: '1/2"'
        }],
        ['EPV05', {
            codigo: '040-955',
            kv: '0.046',
            entrada: '3/8"',
            saida: '1/2"'
        }],
        ['EPV06', {
            codigo: '040-956',
            kv: '0.064',
            entrada: '3/8"',
            saida: '1/2"'
        }],
        ['EPV07', {
            codigo: '040-957',
            kv: '0.114',
            entrada: '3/8"',
            saida: '1/2"'
        }],
        ['EPV08', {
            codigo: '040-958',
            kv: '0.162',
            entrada: '3/8"',
            saida: '1/2"'
        }]

    ];

    for (let i = 0; i < (orificios.length); i++) {
        const capacidadeValvula = interpolizerVEE(tCond, tEvap, fluido, orificios[i][0])
        if (capacidadeValvula > capacidadeFator && ((capacidade * 100) / capacidadeValvula > 40)) {
            const valvula = Object.assign({ tipo: 'Pulso', modelo: orificios[i][0], capacidade: capacidadeValvula, entrada: orificios[i][1].entrada, saida: orificios[i][1].saida }, orificios[i][1])
            return valvula
        }

    }
    // 303 - Nenhuma valvula encontrada
    return 303
}

module.exports = selecionaValvulaVEE;