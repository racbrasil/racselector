const formularioVee = document.getElementById('formulario-vee');

function mostraResultadoVee(data) {
    /* Essa função é responsavel por exibir erros ou resultados recebidos do back-end */
    // Quando é chamada, já houve uma resposta do servidor, logo o loading é tirado.
    document.querySelector('.lds-dual-ring').style = 'display: none';

    switch (data.code) {
        // Caso o código recebido dos dados do servidor seja 100, os parametros informados estão fora do padrão especificado
        case 100:
            // Desabilito o container do loading
            document.getElementById('loading').style = 'display: none'
            // Habilito o container de informações retornadas da vee
            document.getElementById('returned__vee').style = 'display: flex';
            // Desabilito o container de resultados
            document.getElementById('result__vee').style = 'display: none';
            // Habilito o container de erros
            document.getElementById('result__vee__error').style = 'display: flex';
            // Informo o resultado.
            document.querySelector('#result__vee__error span').textContent = 'Parâmetros fora de padrão.'
            break;

        // Caso o código recebido dos dados do servidor seja 200, há um resultado retornado
        case 200:
            // Desabilito o container do loading
            document.getElementById('loading').style = 'display: none'
            // Habilito o container de informações retornadas da vee
            document.getElementById('returned__vee').style = 'display: flex';
            // Habilito o container de resultados
            document.getElementById('result__vee').style = 'display: flex';
            // Desabilito o container de erros
            document.getElementById('result__vee__error').style = 'display: none';

            // Informo todos os resultados presentes em data em seu campo especifico
            document.getElementById('tipo').textContent = data.message.tipo
            document.getElementById('tipoValvula').textContent = 'Modelo'
            document.getElementById('modelo').textContent = data.message.modelo
            document.getElementById('codigo').textContent = data.message.codigo
            document.getElementById('capacidadeValvula').textContent = `${data.message.capacidade} kW`
            document.getElementById('uso').textContent = (parseFloat(formularioVee.querySelector('.form__secao__esquerda #capacidade').value * 100) / data.message.capacidade).toFixed(1) + '%';
            document.getElementById('kV').textContent = data.message.kv
            document.getElementById('entrada').textContent = data.message.entrada
            document.getElementById('saida').textContent = data.message.saida

            // Caso a válvula seja de passo
            if (data.message.tipo == 'Passo') {
                // Mostro imagem da ESV
                document.getElementById('valvulaEPVImg').style = 'display: none';
                document.getElementById('valvulaESVImg').style = 'display: block';
            }
            
            // Caso a válvula seja de pulso
            if (data.message.tipo == 'Pulso') {
                // Mostro a imagem da EPV
                document.getElementById('valvulaEPVImg').style = 'display: block';
                document.getElementById('valvulaESVImg').style = 'display: none';
            }

            break;

        // Caso o código recebido dos dados do servidor seja 300, não foi encontrado nenhum resultado
        case 300:
            // Desabilito o container do loading
            document.getElementById('loading').style = 'display: none'
            // Habilito o container de informações retornadas da vee
            document.getElementById('returned__vee').style = 'display: flex';
            // Desabilito o container de resultados
            document.getElementById('result__vee').style = 'display: none';
            // Habilito o container de erros
            document.getElementById('result__vee__error').style = 'display: flex';
            // Informo que nenhuma valvula foi encontrada
            document.querySelector('#result__vee__error span').textContent = 'Nenhuma válvula encontrada';
            break;

        // Caso o código recebido dos dados do servidor seja 900, ocorreu um erro no backend
        case 900:
            // Desabilito o container do loading
            document.getElementById('loading').style = 'display: none'
            // Habilito o container de informações retornadas da vee
            document.getElementById('returned__vee').style = 'display: flex';
            // Desabilito o container de resultados
            document.getElementById('result__vee').style = 'display: none';
            // Habilito o container de erros
            document.getElementById('result__vee__error').style = 'display: flex';
            // Informo que ocorreu um erro   
            document.querySelector('#result__vee__error span').textContent = 'Ocorreu um erro inesperado.';
            break;

    }

}

function mostraErroVee(erro) {
    /* Essa função é responsavel por mostrar erros no formulario de acordo com o codigo de erro */
    switch (erro.code) {
        /* Mostra erro no campo da capacidade no formulario */
        case 400:
            //Na tag de erro da capacidade na parte esquerda do formulario insira o texto de erro
            formularioVee.querySelector('.form__secao__esquerda #secao__capacidade span').textContent = erro.message;
            //Deixe o campo e as letras da capacidade vermelho
            formularioVee.querySelector('.form__secao__esquerda #secao__capacidade div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;
        /* Mostra erro no campo do refrigerante no formulario */
        case 401:
            //Na tag de erro do refrigerante na parte esquerda do formulario insira o texto de erro
            formularioVee.querySelector('.form__secao__esquerda #secao__refrigerante span').textContent = erro.message;
            //Deixe o campo e as letras da capacidade vermelho
            formularioVee.querySelector('.form__secao__esquerda #secao__refrigerante select').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;
        /* Mostra erro no campo da seleção da válvula no formulario */
        case 402:
            //Na tag de erro da seleção de valvula na parte esquerda do formulario insira o texto de erro
            formularioVee.querySelector('.form__secao__esquerda #secao__valvula span').textContent = erro.message;
            //Deixe o campo e as letras da capacidade vermelho
            formularioVee.querySelector('.form__secao__esquerda #secao__valvula select').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;
        /* Mostra erro no campo da tEvap da válvula no formulario */
        case 403:
            //Na tag de erro da tEvap na parte esquerda do formulario insira o texto de erro
            formularioVee.querySelector('.form__secao__esquerda #secao__tEvap span').textContent = erro.message;
            //Deixe o campo e as letras da capacidade vermelho
            formularioVee.querySelector('.form__secao__esquerda #secao__tEvap div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;
        /* Mostra erro no campo de superaquecimento no formulario */
        case 404:
            //Na tag de erro de superaquecimento na parte esquerda do formulario insira o texto de erro
            formularioVee.querySelector('.form__secao__esquerda #secao__super span').textContent = erro.message;
            //Deixe o campo e as letras da capacidade vermelho
            formularioVee.querySelector('.form__secao__esquerda #secao__super div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;
        /* Mostra erro no campo da tCond no formulario */
        case 405:
            //Na tag de erro da tCond na parte esquerda do formulario insira o texto de erro
            formularioVee.querySelector('.form__secao__esquerda #secao__tCond span').textContent = erro.message;
            //Deixe o campo e as letras da capacidade vermelho
            formularioVee.querySelector('.form__secao__esquerda #secao__tCond div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;
        /* Mostra erro no campo da subresfriamento no formulario */
        case 406:
            //Na tag de erro da subresfriamento na parte esquerda do formulario insira o texto de erro
            formularioVee.querySelector('.form__secao__esquerda #secao__subres span').textContent = erro.message;
            //Deixe o campo e as letras da capacidade vermelho
            formularioVee.querySelector('.form__secao__esquerda #secao__subres div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

    };

}

function confereDadosVee(data) {
    /* Essa função verifica se todos os dados do formulario estão de acordo com os limites especificados */
    let testValue = false;
    let errorFlag = false;

    // Se a capacidade não for um numero ou for menor que zero
    if (isNaN(data.capacidade) || data.capacidade <= 0) {
        // Chamo a função `mostrarErroVee` com o código referente a capacidade e a mensagem de erro
        mostraErroVee({ code: 400, message: 'Valor inválido! Insira um número maior que 0' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Percorro todas as opções de fluidos refrigerantes
    for (let i = 0; i < formularioVee.querySelector('#refrigerante').options.length; i++) {
        let optionValue = formularioVee.querySelector('#refrigerante').options[i].value;
        // Caso o fluido inserido seja igual a um dos valores percorridos, testValue = true pois passou no teste
        if (data.fluido === optionValue) testValue = true;
    }

    // Se o testValue for diferente de true, chamo a função erro com o código referente ao refrigerante e a mensagem de erro 
    // Erro flag como true para sinalizar que houve um erro
    if (testValue !== true) mostraErroVee({ code: 401, message: 'Selecione um refrigerante.' }), errorFlag = true;
    // Reseto a variavel de teste
    testValue = false;

    // Percorro todas as opções de valvulas
    for (let i = 0; i < formularioVee.querySelector('#selectTipoValvula').options.length; i++) {
        let optionValue = formularioVee.querySelector('#selectTipoValvula').options[i].value;
        // Caso o tipo de valvula inserido seja igual a um dos valores percorridos, testValue = true pois passou no teste
        if (data.tipoValvula === optionValue) testValue = true;
    }

    // Se o testValue for diferente de true, chamo a função erro com o código referente ao de seleção de valvula e a mensagem de erro
    // Erro flag como true para sinalizar que houve um erro
    if (testValue !== true) mostraErroVee({ code: 402, message: 'Selecione uma valvula.' }), errorFlag = true;

    // Se tEvap não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tEvap) || ((data.fluido === 'R410A' || data.fluido === 'R134A') && (data.tEvap > 10 || data.tEvap < -30))) {
        // Chamo a função `mostrarErroVee` com o código referente a tEvap e a mensagem de erro
        mostraErroVee({ code: 403, message: 'Valor inválido! Insira um número entre -30 e 10' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se tEvap não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tEvap) || ((data.fluido === 'R407C' || data.fluido === 'R22' || data.fluido === 'R404A') && (data.tEvap > 10 || data.tEvap < -40))) {
        // Chamo a função `mostrarErroVee` com o código referente a tEvap e a mensagem de erro
        mostraErroVee({ code: 403, message: 'Valor inválido! Insira um número entre -40 e 10' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se tEvap não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tEvap) || ((data.fluido === 'R507A') && (data.tEvap > 5 || data.tEvap < -40))) {
        // Chamo a função `mostrarErroVee` com o código referente a tEvap e a mensagem de erro
        mostraErroVee({ code: 403, message: 'Valor inválido! Insira um número entre -40 e 5' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se tEvap não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tEvap) || ((data.fluido === 'R744') && (data.tEvap > -10 || data.tEvap < -40))) {
        // Chamo a função `mostrarErroVee` com o código referente a tEvap e a mensagem de erro
        mostraErroVee({ code: 403, message: 'Valor inválido! Insira um número entre -40 e -10' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se o superaquecimento não for um numero ou for menor que zero
    if (isNaN(data.superaquecimento) || data.superaquecimento <= 0) {
        // Chamo a função `mostrarErroVee` com o código referente ao superaquecimento e a mensagem de erro
        mostraErroVee({ code: 404, message: 'Valor inválido! Insira um número maior que 0' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se tCond não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tCond) || ((data.fluido === 'R404A' || data.fluido === 'R134A' || data.fluido === 'R22' || data.fluido === 'R407C') && (data.tCond < 25 || data.tCond > 50))) {
        // Chamo a função `mostrarErroVee` com o código referente a tCond e a mensagem de erro
        mostraErroVee({ code: 405, message: 'Valor inválido! Insira um número entre 25 e 50' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se tCond não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tCond) || ((data.fluido === 'R410A') && (data.tCond < 30 || data.tCond > 50))) {
        // Chamo a função `mostrarErroVee` com o código referente a tCond e a mensagem de erro
        mostraErroVee({ code: 405, message: 'Valor inválido! Insira um número entre 30 e 50' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se tCond não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tCond) || ((data.fluido === 'R744') && (data.tCond < -5 || data.tCond > 0))) {
        // Chamo a função `mostrarErroVee` com o código referente a tCond e a mensagem de erro
        mostraErroVee({ code: 405, message: 'Valor inválido! Insira um número entre -5 e 0' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se tCond não for um numero e não está na faixa de valores minimos e maximos do fluido refrigerante
    if (isNaN(data.tCond) || ((data.fluido === 'R507A') && (data.tCond < 25 || data.tCond > 45))) {
        // Chamo a função `mostrarErroVee` com o código referente a tCond e a mensagem de erro
        mostraErroVee({ code: 405, message: 'Valor inválido! Insira um número entre 25 e 45' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se o subresfriamento não for um numero, ou for maior que 50, ou for menor que zero
    if (isNaN(data.subres) || data.subres > 50 || data.subres <= 0) {
        // Chamo a função `mostrarErroVee` com o código referente a subresfriamento e a mensagem de erro
        mostraErroVee({ code: 406, message: 'Valor inválido! Insira um número maior que 0 e menor que 50' });
        // Erro flag como true para sinalizar que houve um erro
        errorFlag = true;
    }

    // Se a error flag for false, retorno 200, se true, retorno 400
    return !errorFlag ? { code: 200, message: '' } : { code: 400, message: '' };

}

async function enviarDadosParaServidorVee(data) {
    /* Essa função é responsavel por enviar os dados inseridos no formulario para o servidor */

    // Ativo o loading
    document.querySelector('.lds-dual-ring').style = 'display: flex';

    // Confiro os dados inseridos e caso tenha algum erro já retorno a função e não envio os dados ao servidor
    const returnedData = confereDadosVee(data);
    if (returnedData.code != 200) return returnedData;

    // Tento fazer uma conexão com o servidor enviando os dados
    try {

        const response = await fetch('http://54.91.172.64:3003/vee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        // Se a resposta não for ok, gero um erro
        if (!response.ok) {
            throw new Error(response.status);
        }

        // Aguardo a resposta do servidor
        const result = await response.json();
        // Quando obter a respota, retorno o que foi obtido
        return result;

    }

    // Caso um erro seja gerado
    catch (error) {
        // Retorno 900 para mostragem de erro.
        return { code: 900, message: 'Ocorreu um erro inesperado.' };
    }

}

function resetaStyleFormVee() {
    /* Função que reseta o formulario */
    // Retiro o resultado da vee
    document.getElementById('returned__vee').style = 'display: none';

    // Reseto todos os textos de erro
    const spansInSection = document.querySelectorAll('#formulario-vee span');
    spansInSection.forEach(span => {
        span.textContent = '';
    }); 

    // Reseto ao padrão a borda dos inputs
    const inputsInForm = document.querySelectorAll('.form__secao div');
    inputsInForm.forEach(div => {
        div.style.removeProperty('box-shadow');
        div.style.removeProperty('outline');
    });

}

formularioVee.addEventListener('submit', async function (event) {
    /* Aguardo o formulario sofrer um submit */

    // Interrompo o reload da tela
    event.preventDefault();
    // Reseto o formulario
    resetaStyleFormVee();

    // Adiciono todos os dados inseridos em data
    const data = {
        capacidade: parseFloat(formularioVee.querySelector('.form__secao__esquerda #capacidade').value),
        fluido: formularioVee.querySelector('.form__secao__esquerda #refrigerante').value,
        tipoValvula: formularioVee.querySelector('.form__secao__esquerda #selectTipoValvula').value,
        tEvap: parseFloat(formularioVee.querySelector('.form__secao__esquerda #tEvap').value),
        superaquecimento: parseFloat(formularioVee.querySelector('.form__secao__esquerda #super').value),
        tCond: parseFloat(formularioVee.querySelector('.form__secao__esquerda #tCond').value),
        subres: parseFloat(formularioVee.querySelector('.form__secao__esquerda #subres').value)
    };

    // Aguardo o resultado do servidor e mostro resultado
    mostraResultadoVee(await enviarDadosParaServidorVee(data));

});