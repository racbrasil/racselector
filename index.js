// Importa os módulos necessários do Node.js
const express = require('express');
const cors = require('cors');
const path = require('path');

// Define o caminho do favicon
const faviconPath = path.join(__dirname, 'src', 'docs', 'favicon.png');

// Cria uma instância do aplicativo Express
const app = express();
const port = 3003;

// Define o middleware para servir o arquivo do favicon
app.use(express.json());
app.use(cors());

// Define o middleware para servir o arquivo de favicon
app.use('/favicon.png', express.static(faviconPath));

// Define o middleware para servir os arquivos estáticos da pasta 'src'
app.use(express.static(path.join(__dirname, 'src')));

// Define a rota principal, que retorna o arquivo HTML da página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/html/index.html');
})

app.post("/regulador", (req, res) => {
    
    const selecionaRegulador = require('./src/js/backend/Regulador/selecionaRegulador');

    const {modelo, compressor} = req.body;

    const returnedRegulador = selecionaRegulador(compressor);

    res.json({
        code: returnedRegulador.code,
        message: returnedRegulador.message
    });

})

app.post("/vent", (req, res) => {
    
    const selecionaVentilador = require('./src/js/backend/Ventilador/selecionaVentilador')

    const {modelo, compressor} = req.body;

    const returnedVentilador = selecionaVentilador(compressor);

    res.json({
        code: returnedVentilador.code,
        message: returnedVentilador.message
    });

})

// Define a rota '/vee' para lidar com solicitações POST
app.post("/vee", (req, res) => {
    // Lógica para selecionar a válvula adequada com base nos parâmetros fornecidos

    // Requere as funções de seleção de válvulas EPV e ESV do backend
    const selecionaValvulaEPV = require('./src/js/backend/VEE/funcoesVEE2');
    const selecionaValvulaESV = require('./src/js/backend/VEE/funcoesESV2');

    // Extrai os parâmetros do corpo da requisição
    const { capacidade, fluido, tEvap, superaquecimento, tCond, subres, tipoValvula } = req.body;

    // Verifica o tipo de valvula solicitado
    if (tipoValvula === 'EPV') {
        // Se for uma valvula EPV, chama a função de seleção de valvula EPV
        const returnValvula = selecionaValvulaEPV(capacidade, tCond, tEvap, fluido, subres);
        // Retorna a resposta JSON com o código e a informação da válvula selecionada
        res.json({
            code: returnValvula.code,
            message: returnValvula.message
        });

    }

    else if (tipoValvula === 'ESV') {
        // Se for uma válvula ESV, chama a função de seleção de valvula ESV
        const returnValvula = selecionaValvulaESV(capacidade, tCond, tEvap, fluido, subres);
        // Retorna a resposta JSON com o código e a informação da válvula selecionada
        res.json({
            code: returnValvula.code,
            message: returnValvula.message
        });

    }

    else {
        // Se não for especificado o tipo de válvula
        // Tenta primeiramente selecionar a EPV
        const returnValvulaEPV = selecionaValvulaEPV(capacidade, tCond, tEvap, fluido, subres);
        // Se não for encontrada a válvula EPV
        if (returnValvulaEPV.code !== 200) {
            // Tenta selecionar a válvula ESV
            const returnValvulaESV = selecionaValvulaESV(capacidade, tCond, tEvap, fluido, subres);
            // Retorna a resposta JSON com o código e a informação da válvula selecionada
            res.json({
                code: returnValvulaESV.code,
                message: returnValvulaESV.message
            });

        }
        // Se for encontrada uma válvula EPV    
        else {
            // Retorna a resposta JSON com o código e a informação da válvula selecionada
            res.json({
                code: returnValvulaEPV.code,
                message: returnValvulaEPV.message
            });
        }

    }

});

// Define a rota '/oil-pack' para lidar com solicitações POST
app.post("/oil-pack", (req, res) => {
    // Lógica para selecionar o oil-pack com base nos parâmetros fornecidos

    // Requer as funções necessárias para selecionar o oil-pack do backend
    const selecionaOilPack = require('./src/js/backend/Oil/funcoesOilPack');

    // Requer as tabelas necessárias para o cálculo do oil-pack do backend
    const tabelaOilPack = require('./src/js/backend/Oil/tabelaOilPack');
    const tabelaVaporSuper = require('./src/js/backend/Oil/tabelaVaporSuper');

    // Extrai os parâmetros necessários do corpo da requisição
    const { nRegimes, fluido, tEvap, tCond, nCompressores, vMassa, tDesc } = req.body;

    // Chama a função para selecionar o oil-pack com base nos parâmetros fornecidos
    const returnOilPack = selecionaOilPack(nRegimes, tabelaVaporSuper, tabelaOilPack, nCompressores, vMassa, fluido, tCond, tDesc);

    // Retorna a resposta da requisição em formato JSON com o código e a mensagem do oil-pack selecionado
    res.json({
        code: returnOilPack.code,
        message: returnOilPack.message
    });

});

// Define a rota '/tanque' para lidar com solicitações POST
app.post('/tanque', (req, res) => {
    // Lógica para selecionar o tanque de liquido com base nos parâmetros oferecidos
    
    // Requer a função responsável por selecionar o tanque de líquido do backend
    const selecionaTanqueLiquido = require('./src/js/backend/Tanque/funcoesTanque')

    // Extrai os parâmetros necessários do corpo da requisição
    const { capacidade, fluido, tEvap, superaquecimento, tCond, subres, evapVolume, condVolume, compSuc,
        diamSuc, compLinhaLiquido, diamLinhaLiquido, compDesc, diamDesc, radioLocalizacao, minEnchimento } = req.body;

    // Chama a função para selecionar o tanque de líquido com base nos parâmetros fornecidos
    const returnedTanque = selecionaTanqueLiquido(fluido, tCond, tEvap, evapVolume, condVolume, diamSuc, compSuc, diamLinhaLiquido, compLinhaLiquido, diamDesc, compDesc, minEnchimento);
    
    // Retorna a resposta da requisição em formato JSON com o código e as informações do tanque selecionado
    res.json({
        code: returnedTanque.code,
        message: returnedTanque.message
    });

});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`aplicativo rodando em http://localhost:${port}`);
});