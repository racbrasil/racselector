function getConexaoCompressor(compressor) {

    const compressores = require('./TabelaCompressores');

    for (let conexao in compressores) {
        if (compressores[conexao].includes(compressor)) {
            return conexao
        }
    }
    
    return 'erro'
}

function selecionaRegulador(compressor) {

    const conexaoCompressor = getConexaoCompressor(compressor);

    if (conexaoCompressor === 'flange') {

        const message = {
            're2': {
                'nome': 'RE-2 - Sensor Óptico de Nivel',
                'codigo': '050-170',
                'pmt': '44 Bar',
                'ip': 'IP54',
                'tensao': '230V',
                'adaptador': 'Não aplicado',
                'codigoAdaptador': 'Não aplicado'
            },
            'reb3': {
                'nome': 'REB-3 - Sensor de Nivel com Bóia',
                'codigo': '050-174',
                'pmt': '45 Bar',
                'ip': 'IP54',
                'tensao': '230V',
                'adaptador': 'Não aplicado',
                'codigoAdaptador': 'Não aplicado'
            }
        }

        return { code: 200, message: message }

    }

    else if (conexaoCompressor === 'adaptador') {

        const message = {
            're2': {
                'nome': 'RE-2 - Sensor Óptico de Nivel',
                'codigo': '050-170',
                'pmt': '44 Bar',
                'ip': 'IP54',
                'tensao': '230V',
                'adaptador': 'Macho - 1.1/8"',
                'codigoAdaptador': '023-991'
            },
            'reb3': {
                'nome': 'REB-3 - Sensor de Nivel com Bóia',
                'codigo': '050-174',
                'pmt': '45 Bar',
                'ip': 'IP54',
                'tensao': '230V',
                'adaptador': 'Macho - 1.1/8"',
                'codigoAdaptador': '023-991'
            }
        }

        return { code: 200, message: message }

    }

    return 'erro'
}

module.exports = selecionaRegulador;