function buscaCodigoVentilador(elementoBusca) {
    const ventiladores = require('./TabelaCompressores');
    for (let compressores in ventiladores) {
        // Verificar se o elemento está presente no grupo atual
        if (ventiladores[compressores].includes(elementoBusca)) {
            const codigoVentilador = compressores;
            return codigoVentilador
        }
    }
    return 'Erro'
}

function selecionaVentilador(elementoBusca) {

    const ventiladores = require('./TabelaVentiladores');
    const codigoVentilador = buscaCodigoVentilador(elementoBusca);

    if(codigoVentilador !== 'Erro'){
        const ventiladorInfo = ventiladores[codigoVentilador];

        const message = Object.assign({'codigo': codigoVentilador}, ventiladorInfo);
        return { code: 200, message: message}
    }

    return { code: 300, message: 'Nenhuma válvula encontrada.' }

}

module.exports = selecionaVentilador;