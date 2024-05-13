function interpolizer(x, x0, x1, y0, y1) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

function confereDados(tabelaVaporSuper, nCompressores, vMassa, fluido, tCond, tDesc) {

    if (!(fluido in tabelaVaporSuper)) return { code: 100, message: 'Fluido inválido.' }; // Confiro Fluido Refrigerante -> 100: Erro de parâmetro
    if (tCond < 35 || tCond > 45) return { code: 100, message: 'Temperatura de Condensação inválida.' }; // Confiro tCOnd -> 100: Erro de parâmetro
    if (vMassa <= 0) return { code: 100, message: 'Vazão em massa inválida.' };
    if (nCompressores < 0 || nCompressores > 6) return { code: 100, message: 'Número de compressores inválidos' };

    return { code: 200 };
}

function returnVolumeEspecifico(tabelaVaporSuper, fluido, tDesc, tCond) {

    const listaTemperaturas = Object.keys(tabelaVaporSuper[fluido]).map(Number);

    let tDescHigh = null;
    let tDescLow = null;

    for (let i = 1; i < listaTemperaturas.length; i++) {

        if (tDesc >= listaTemperaturas[i - 1] && tDesc <= listaTemperaturas[i]) {
            tDescHigh = listaTemperaturas[i];
            tDescLow = listaTemperaturas[i - 1];
        }

    }

    const x0 = interpolizer(tCond, 35, 45, tabelaVaporSuper[fluido][tDescLow][35], tabelaVaporSuper[fluido][tDescLow][45]);
    const x1 = interpolizer(tCond, 35, 45, tabelaVaporSuper[fluido][tDescHigh][35], tabelaVaporSuper[fluido][tDescHigh][45]);

    return interpolizer(tDesc, tDescLow, tDescHigh, x0, x1)
}

function selecionaOilPack(nRegimes, tabelaVaporSuper, tabelaOilPack, nCompressores, vMassa, fluido, tCond, tDesc) {

    if (nRegimes === 1) {

        const dataIsOk = confereDados(tabelaVaporSuper, nCompressores, vMassa, fluido, tCond, tDesc);
        if (dataIsOk.code != 200) return dataIsOk

        const vazaoVolumetrica = nCompressores * (vMassa * (returnVolumeEspecifico(tabelaVaporSuper, fluido, tDesc, tCond)));
        const listaVazaoVol = Object.keys(tabelaOilPack[fluido]).map(Number);

        if (vazaoVolumetrica < 4) {
            return { code: 300, message: 'Vazão volumétrica abaixo do limite minimo permitido' }
        }

        for (let i = 0; i < listaVazaoVol.length; i++) {

            if (vazaoVolumetrica <= listaVazaoVol[i]) {
                return {
                    code: 200,
                    message: {
                        oilPack: tabelaOilPack[fluido][listaVazaoVol[i]],
                        vazaoVolumetrica: vazaoVolumetrica.toFixed(2)
                    }
                };
            }

        }

        return { code: 300, message: 'Nenhum Oil Pack encontrado.' } // Erro 303: Nenhuma seleção encontrada
    }

    else if (nRegimes === 2) {

        const data1IsOk = confereDados(tabelaVaporSuper, nCompressores[0], vMassa[0], fluido, tCond[0], tDesc[0]);
        if (data1IsOk.code != 200) return data1IsOk

        const data2IsOk = confereDados(tabelaVaporSuper, nCompressores[1], vMassa[1], fluido, tCond[1], tDesc[1]);
        if (data2IsOk.code != 200) return data2IsOk

        const vazaoVolumetrica1 = nCompressores[0] * (vMassa[0] * (returnVolumeEspecifico(tabelaVaporSuper, fluido, tDesc[0], tCond[0])));
        const vazaoVolumetrica2 = nCompressores[1] * (vMassa[1] * (returnVolumeEspecifico(tabelaVaporSuper, fluido, tDesc[1], tCond[1])));
        const vazaoVolumetrica = vazaoVolumetrica1 + vazaoVolumetrica2;

        const listaVazaoVol = Object.keys(tabelaOilPack[fluido]).map(Number);

        //console.log(vazaoVolumetrica);

        if (vazaoVolumetrica < 4) {
            return { code: 300, message: 'Vazão volumétrica abaixo do limite minimo permitido' }
        }

        for (let i = 0; i < listaVazaoVol.length; i++) {
            if (vazaoVolumetrica <= listaVazaoVol[i]) {
                return {
                    code: 200,
                    message: {
                        oilPack: tabelaOilPack[fluido][listaVazaoVol[i]],
                        vazaoVolumetrica: vazaoVolumetrica.toFixed(2)
                    }
                };
            }

        }

        return { code: 300, message: 'Nenhum Oil Pack encontrado.' } // Erro 303: Nenhuma seleção encontrada
    }

}

module.exports = selecionaOilPack;