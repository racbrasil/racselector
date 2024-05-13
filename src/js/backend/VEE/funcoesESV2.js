const TabelaESV = require('./tabelaESV');
const tabelaFatorSub = require('./tabelaFatorSub');
const tabelaInfoESV = require('./tabelaInfoESV');

class Valvula {

    constructor(tCond, tEvap, capacidade, fluido, subresfriamento) {

        if (fluido != 'R410A' && fluido != 'R407C' && fluido != 'R22' && fluido != 'R134A' && fluido != 'R404A') throw new Error('Fluido refrigerante inválido no catálogo para válvulas de passo. ')

        this.fluido = {
            tCond: {
                limiteMin: this.calculaLimitesTCond(fluido).min,
                limiteMax: this.calculaLimitesTCond(fluido).max
            },
            tEvap: {
                limiteMin: this.calculaLimitesTEvap(fluido).min,
                limiteMax: this.calculaLimitesTEvap(fluido).max
            }
        };

        if (tCond > this.fluido.tCond.limiteMax) throw new Error('O valor da temperatura de condensação está acima do limite máximo presente no catálogo da válvula de passo.')
        if (tCond < this.fluido.tCond.limiteMin) throw new Error('O valor da temperatura de condensação está abaixo do limite mínimo presente no catálogo da válvula de passo.')

        this.tCond = {
            min: this.calcularMinMaxTCond(tCond, fluido).min,
            max: this.calcularMinMaxTCond(tCond, fluido).max
        };

        if (tEvap > this.fluido.tEvap.limiteMax) throw new Error('O valor da temperatura de evaporação está acima do limite máximo presente no catálogo da válvula de passo.')
        if (tEvap < this.fluido.tEvap.limiteMin) throw new Error('O valor da temperatura de evaporação está abaixo do limite mínimo presente no catálogo da válvula de passo.')

        this.tEvap = {
            min: this.calcularMinMaxTEvap(this.tCond.max, fluido, tEvap).min,
            max: this.calcularMinMaxTEvap(this.tCond.max, fluido, tEvap).max,
            fator: this.calculaFatorTEvap(tEvap)
        };

        this.subresfriamento = {
            fator: this.calculaFatorSubres(subresfriamento, fluido)
        }

        this.capacidade = {
            nominal: capacidade * this.subresfriamento.fator * this.tEvap.fator
        };
    }

    calculaLimitesTCond(fluido) {

        const listaTCond = Object.keys(TabelaESV['ESV13'][fluido]).sort((a, b) => a - b);
        const tamanho = (listaTCond.length) - 1;

        const menorValorTCond = listaTCond[0];
        const maiorValorTCond = listaTCond[tamanho];

        return { min: menorValorTCond, max: maiorValorTCond }
    }

    calculaLimitesTEvap(fluido) {

        const listaTCond = Object.keys(TabelaESV['ESV13'][fluido]).sort((a, b) => a - b);
        const listaTEvap = Object.keys(TabelaESV['ESV13'][fluido][listaTCond[0]]).sort((a, b) => a - b);
        const tamanho = (listaTEvap.length) - 1;

        const menorValorTEvap = listaTEvap[0];
        const maiorValorTEvap = listaTEvap[tamanho];

        return { min: menorValorTEvap, max: maiorValorTEvap }
    }

    calcularMinMaxTCond(tCond, fluido) {
        /*Esse método calcula os valores minimos e máximos da temperatura de condensação*/
        const valoresTCond = Object.keys(TabelaESV['ESV13'][fluido]).sort((a, b) => a - b); //Transformo as chaves do objeto em uma lista e ordeno eles do menor para o maior
        for (let i = 1; i < valoresTCond.length; i++) {

            if (tCond <= valoresTCond[i]) {
                return { min: valoresTCond[i - 1], max: valoresTCond[i] }
            }
        }
    }

    calcularMinMaxTEvap(tCondMax, fluido, tEvap) {
        /*Esse método calcula os valores minimos e máximos da temperatura de condensação*/
        const valoresTEvap = Object.keys(TabelaESV['ESV13'][fluido][tCondMax]).sort((a, b) => a - b); //Transformo as chaves do objeto em uma lista e ordeno eles do menor para o maior
        for (let i = 1; i < valoresTEvap.length; i++) {
            if (tEvap <= valoresTEvap[i]) {
                return { min: valoresTEvap[i - 1], max: valoresTEvap[i] }
            }
        }
    }

    calculaFatorSubres(subresfriamento, fluido) {
        /*Esse método calcula a capacidade nominal da valvula */
        for (let i in tabelaFatorSub[fluido]) {
            if (subresfriamento <= i) {
                const fator = tabelaFatorSub[fluido][i];
                return fator;
            }
        }
    }

    calculaFatorTEvap(tEvap) {
        /*Esse método retorna o fator que será aplicado na valvula de acordo com a tEvap */
        return 1.25
    }
}

function interpolizer(x, x0, x1, y0, y1) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

function selecionaValvulaESV(capacidade, tCond, tEvap, fluido, subresfriamento) {

    try {
        
        const valvula = new Valvula(tCond, tEvap, capacidade, fluido, subresfriamento);
        for (nomeValvula in TabelaESV) {
            const tCondMinTEvapMinY = TabelaESV[nomeValvula][fluido][valvula.tCond.min][valvula.tEvap.min];
            const tCondMaxTEvapMinY = TabelaESV[nomeValvula][fluido][valvula.tCond.max][valvula.tEvap.min];

            const tCondMinTEvapMaxY = TabelaESV[nomeValvula][fluido][valvula.tCond.min][valvula.tEvap.max];
            const tCondMaxTEvapMaxY = TabelaESV[nomeValvula][fluido][valvula.tCond.max][valvula.tEvap.max]

            const capacidadeTCondInterpolize1 = interpolizer(tCond, valvula.tCond.min, valvula.tCond.max, tCondMinTEvapMinY, tCondMaxTEvapMinY);
            const capacidadeTCondInterpolize2 = interpolizer(tCond, valvula.tCond.min, valvula.tCond.max, tCondMinTEvapMaxY, tCondMaxTEvapMaxY);

            const capacidadeTEvapInterpolize = interpolizer(tEvap, valvula.tEvap.min, valvula.tEvap.max, capacidadeTCondInterpolize1, capacidadeTCondInterpolize2).toFixed(2);

            if (capacidadeTEvapInterpolize > valvula.capacidade.nominal && (((capacidadeTEvapInterpolize * 100) / valvula.capacidade.nominal) > 40)) {
                const message = Object.assign({ tipo: 'Passo', capacidade: capacidadeTEvapInterpolize, modelo: nomeValvula }, tabelaInfoESV[nomeValvula]);
                return { code: 200, message: message };
            }

        }

        return { code: 300, message: 'Nenhuma válvula encontrada.' }
    }

    catch (error) {
        return { code: 300, message: error.message }
    }
}
console.log(new Valvula(45, -30, 9, 'R404A', 3));
module.exports = selecionaValvulaESV;