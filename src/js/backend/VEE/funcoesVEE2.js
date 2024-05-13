const TabelaVEE = require('./tabelaVEE');
const tabelaFatorSub = require('./tabelaFatorSub');
const tabelaInfoEPV = require('./tabelaInfoEPV');

class Valvula {
    // Construtor da classe Valvula
    constructor(tCond, tEvap, capacidade, fluido, subresfriamento) {
        // Verifica se o fluido é válido
        if (fluido != 'R407C' && fluido != 'R134A' && fluido != 'R507A' && fluido != 'R404A' && fluido != 'R22' && fluido != 'R744') 
            throw new Error('Fluido refrigerante inválido no catálogo para válvulas de passo. ')

        // Configuração dos limites de temperatura para o fluido
        this.fluido = {
            tCond: {
                limiteMin: this.calculaLimitesTCond(fluido).min,
                limiteMax: this.calculaLimitesTCond(fluido).max
            },
            tEvap: {
                limiteMin: this.calculaLimitesTEvap(fluido, this.limiteMin).min,
                limiteMax: this.calculaLimitesTEvap(fluido, this.limiteMin).max
            }
        };

        // Verifica se a temperatura de condensação está dentro dos limites
        if (tCond > this.fluido.tCond.limiteMax) 
            throw new Error('O valor da temperatura de condensação está acima do limite máximo presente no catálogo da válvula de passo.')
        if (tCond < this.fluido.tCond.limiteMin) 
            throw new Error('O valor da temperatura de condensação está abaixo do limite mínimo presente no catálogo da válvula de passo.')

        // Configuração da temperatura de condensação
        this.tCond = {
            min: this.calcularMinMaxTCond(tCond, fluido).min,
            max: this.calcularMinMaxTCond(tCond, fluido).max
        };

        // Verifica se a temperatura de evaporação está dentro dos limites
        if (tEvap > this.fluido.tEvap.limiteMax) 
            throw new Error('O valor da temperatura de evaporação está acima do limite máximo presente no catálogo da válvula de passo.')
        if (tEvap < this.fluido.tEvap.limiteMin) 
            throw new Error('O valor da temperatura de evaporação está abaixo do limite mínimo presente no catálogo da válvula de passo.')

        // Configuração da temperatura de evaporação
        this.tEvap = {
            min: this.calcularMinMaxTEvap(this.tCond.max, fluido, tEvap).min,
            max: this.calcularMinMaxTEvap(this.tCond.max, fluido, tEvap).max,
            fator: this.calculaFatorTEvap(tEvap)
        };

        // Configuração do fator de sub-resfriamento
        this.subresfriamento = {
            fator: this.calculaFatorSubres(subresfriamento, fluido)
        }

        // Configuração da capacidade nominal
        this.capacidade = {
            nominal: capacidade * this.subresfriamento.fator * this.tEvap.fator
        };
    }

    // Método para calcular os limites da temperatura de condensação
    calculaLimitesTCond(fluido) {
        const listaTCond = Object.keys(TabelaVEE['EPV01'][fluido]).sort((a, b) => a - b);
        const tamanho = (listaTCond.length) - 1;

        const menorValorTCond = listaTCond[0];
        const maiorValorTCond = listaTCond[tamanho];

        return { min: menorValorTCond, max: maiorValorTCond }
    }

    // Método para calcular os limites da temperatura de evaporação
    calculaLimitesTEvap(fluido) {
        const listaTCond = Object.keys(TabelaVEE['EPV01'][fluido]).sort((a, b) => a - b);
        const listaTEvap = Object.keys(TabelaVEE['EPV01'][fluido][listaTCond[0]]).sort((a, b) => a - b);
        const tamanho = (listaTEvap.length) - 1;

        const menorValorTEvap = listaTEvap[0];
        const maiorValorTEvap = listaTEvap[tamanho];

        return { min: menorValorTEvap, max: maiorValorTEvap }
    }

    // Método para calcular os valores mínimos e máximos da temperatura de condensação
    calcularMinMaxTCond(tCond, fluido) {
        const valoresTCond = Object.keys(TabelaVEE['EPV01'][fluido]).sort((a, b) => a - b); //Transformo as chaves do objeto em uma lista e ordeno eles do menor para o maior
        for (let i = 1; i < valoresTCond.length; i++) {

            if (tCond <= valoresTCond[i]) {
                return { min: valoresTCond[i - 1], max: valoresTCond[i] }
            }
        }
    }

    // Método para calcular os valores mínimos e máximos da temperatura de evaporação
    calcularMinMaxTEvap(tCondMax, fluido, tEvap) {
        const valoresTEvap = Object.keys(TabelaVEE['EPV01'][fluido][tCondMax]).sort((a, b) => a - b); //Transformo as chaves do objeto em uma lista e ordeno eles do menor para o maior
        for (let i = 1; i < valoresTEvap.length; i++) {
            if (tEvap <= valoresTEvap[i]) {
                return { min: valoresTEvap[i - 1], max: valoresTEvap[i] }
            }
        }
    }

    // Método para calcular o fator de sub-resfriamento
    calculaFatorSubres(subresfriamento, fluido) {
        for (let i in tabelaFatorSub[fluido]) {
            if (subresfriamento <= i) {
                const fator = tabelaFatorSub[fluido][i];
                return fator;
            }
        }
    }

    // Método para calcular o fator de temperatura de evaporação
    calculaFatorTEvap(tEvap) {
        if (tEvap <= 5 && tEvap >= -15) return 1.25
        if (tEvap < -15 && tEvap >= -40) return 1.50
    }
}

// Função de interpolação
function interpolizer(x, x0, x1, y0, y1) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

function selecionaValvulaEPV(capacidade, tCond, tEvap, fluido, subresfriamento) {
    /*Essa função é responsavel por selecionar a valvula de acordo com os parametros fornecidos, utilizando-se de tabelas e interpolações */
    try {
        // Tenta criar uma nova instância da classe Valvula
        const valvula = new Valvula(tCond, tEvap, capacidade, fluido, subresfriamento);

        // Percorre as válvulas na tabela VEE
        for (nomeValvula in TabelaVEE) {
            // Obtém os valores da tabela VEE para a temperatura de condensação mínima e máxima, com temperatura de evaporação mínima e máxima
            const tCondMinTEvapMinY = TabelaVEE[nomeValvula][fluido][valvula.tCond.min][valvula.tEvap.min];
            const tCondMaxTEvapMinY = TabelaVEE[nomeValvula][fluido][valvula.tCond.max][valvula.tEvap.min];

            const tCondMinTEvapMaxY = TabelaVEE[nomeValvula][fluido][valvula.tCond.min][valvula.tEvap.max];
            const tCondMaxTEvapMaxY = TabelaVEE[nomeValvula][fluido][valvula.tCond.max][valvula.tEvap.max]
            
            // Realiza interpolação para obter a capacidade interpolada com base nas temperaturas
            const capacidadeTCondInterpolize1 = interpolizer(tCond, valvula.tCond.min, valvula.tCond.max, tCondMinTEvapMinY, tCondMaxTEvapMinY);
            const capacidadeTCondInterpolize2 = interpolizer(tCond, valvula.tCond.min, valvula.tCond.max, tCondMinTEvapMaxY, tCondMaxTEvapMaxY);
            const capacidadeTEvapInterpolize = interpolizer(tEvap, valvula.tEvap.min, valvula.tEvap.max, capacidadeTCondInterpolize1, capacidadeTCondInterpolize2).toFixed(2);
            
            // Verifica se a capacidade interpolada é maior que a capacidade nominal da válvula e se a diferença percentual é maior que 40%
            if (capacidadeTEvapInterpolize > valvula.capacidade.nominal && (((capacidadeTEvapInterpolize * 100) / valvula.capacidade.nominal) > 40)) {
                // Se atender aos critérios, retorna uma mensagem com informações sobre a válvula
                const message = Object.assign({ tipo: 'Pulso', capacidade: capacidadeTEvapInterpolize, modelo: nomeValvula }, tabelaInfoEPV[nomeValvula]);
                return { code: 200, message: message };
            }


        }
        // Se nenhuma válvula atender aos critérios, retorna uma mensagem informando que nenhuma válvula foi encontrada
        return { code: 300, message: 'Nenhuma válvula encontrada.' }

    }

    catch (error) {
        // Se ocorrer um erro ao tentar criar a válvula, retorna uma mensagem de erro
        return { code: 300, message: error.message }
    }
}

module.exports = selecionaValvulaEPV;