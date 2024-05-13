const formularioTanque = document.getElementById('formulario-tanque');

function mostraResultadoTanque(data) {

    document.querySelector('.lds-dual-ring').style = 'display: none';

    switch (data.code) {

        case 100:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('returned__tanque').style = 'display: flex';
            document.getElementById('result__tanque').style = 'display: none';
            document.getElementById('result__tanque__massa').style = 'display: none';
            document.getElementById('result__tanque__error').style = 'display: flex';
            document.getElementById('result__tanque__info').style = 'display: none';
            document.querySelector('#result__tanque__error span').textContent = 'Parâmetros fora de padrão.'
            break;

        case 200:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('returned__tanque').style = 'display: grid';
            document.getElementById('result__tanque').style = 'display: flex';
            document.getElementById('result__tanque__massa').style = 'display: flex';
            document.getElementById('result__tanque__error').style = 'display: none';
            document.getElementById('result__tanque__info').style = 'display: grid';
            document.querySelector('#returned__tanque #modelo p').textContent = `${data.message.modelo}/${data.message.codigo}`;
            document.querySelector('#returned__tanque #volume p').textContent = data.message.volume;
            document.querySelector('#returned__tanque #entrada p').textContent = data.message.entrada;
            document.querySelector('#returned__tanque #saida p').textContent = data.message.saida;
            document.querySelector('#returned__tanque #altura p').textContent = data.message.altura;
            document.querySelector('#returned__tanque #diametro p').textContent = data.message.diametro;
            document.querySelector('.result_massa p').textContent = `${(data.message.massaEnchimento).toFixed(1)}Kg`;

            if(data.message.modelo === 'VLR-100'){
                document.getElementById('result__info').style = 'display: block'; 
            } else {
                document.getElementById('result__info').style = 'display: none'; 
            }

            break;

        case 300:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('returned__tanque').style = 'display: flex';
            document.getElementById('result__tanque').style = 'display: none';
            document.getElementById('result__tanque__massa').style = 'display: none';
            document.getElementById('result__tanque__error').style = 'display: flex';
            document.getElementById('result__tanque__info').style = 'display: none';
            document.querySelector('#result__tanque__error span').textContent = data.message;
            break;

        case 900:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('returned__tanque').style = 'display: flex';
            document.getElementById('result__tanque').style = 'display: none';
            document.getElementById('result__tanque__massa').style = 'display: none';
            document.getElementById('result__tanque__error').style = 'display: flex';
            document.getElementById('result__tanque__info').style = 'display: none';
            document.querySelector('#result__tanque__error span').textContent = 'Ocorreu um erro inesperado.';
            break;

    }

}

function mostraErroTanque(erro) {

    switch (erro.code) {

        /*case 400:
            formularioTanque.querySelector('.form__secao__esquerda #secao__capacidade span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__esquerda #secao__capacidade div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;
*/
        case 401:
            formularioTanque.querySelector('.form__secao__esquerda #secao__refrigerante span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__esquerda #secao__refrigerante select').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 402:
            formularioTanque.querySelector('.form__secao__esquerda #secao__tEvap span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__esquerda #secao__tEvap div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 403:
            formularioTanque.querySelector('.form__secao__esquerda #secao__super span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__esquerda #secao__super div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 404:
            formularioTanque.querySelector('.form__secao__esquerda #secao__tCond span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__esquerda #secao__tCond div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 405:
            formularioTanque.querySelector('.form__secao__esquerda #secao__subres span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__esquerda #secao__subres div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 406:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__evap span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__evap div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 407:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__cond span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__cond div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 408:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__comp__suc span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__comp__suc div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 409:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__diam__suc span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__diam__suc div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 410:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__comp__liq span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__comp__liq div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 411:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__diam__liq span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__diam__liq div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 412:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__comp__desc span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__comp__desc div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 413:
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__diam__desc span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__direita__tanque #secao__diam__desc div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

        case 415:
            formularioTanque.querySelector('.form__secao__abaixo__tanque #secao__minEnc span').textContent = erro.message;
            formularioTanque.querySelector('.form__secao__abaixo__tanque #secao__minEnc div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
            break;

    };

};

function confereDadosTanque(data) {

    let testValue = false;
    let errorFlag = false;

    // Confere capacidade 400
    /*if (isNaN(data.capacidade) || data.capacidade <= 0) {
        mostraErroTanque({ code: 400, message: 'Valor inválido! Insira um número maior que 0' });
        errorFlag = true;
    }*/

    // Confere refrigerante 401
    for (let i = 0; i < formularioVee.querySelector('#refrigerante').options.length; i++) {
        let optionValue = formularioVee.querySelector('#refrigerante').options[i].value;
        if (data.fluido === optionValue) testValue = true;
    }

    if (testValue !== true) mostraErroTanque({ code: 401, message: 'Selecione um refrigerante.' }), errorFlag = true;

    // Confere tEvap 403
    if (isNaN(data.tEvap) || ((data.fluido === 'R410A' || data.fluido === 'R134A') && (data.tEvap > 10 || data.tEvap < -30))) {
        mostraErroTanque({ code: 402, message: 'Valor inválido! Insira um número entre -30 e 10' });
        errorFlag = true;
    }

    if (isNaN(data.tEvap) || ((data.fluido === 'R407C' || data.fluido === 'R22' || data.fluido === 'R404A') && (data.tEvap > 10 || data.tEvap < -40))) {
        mostraErroTanque({ code: 402, message: 'Valor inválido! Insira um número entre -40 e 10' });
        errorFlag = true;
    }

    if (isNaN(data.tEvap) || ((data.fluido === 'R507A') && (data.tEvap > 5 || data.tEvap < -40))) {
        mostraErroTanque({ code: 402, message: 'Valor inválido! Insira um número entre -40 e 5' });
        errorFlag = true;
    }

    // Confere superaquecimento 404
    if (isNaN(data.superaquecimento) || data.superaquecimento <= 0) {
        mostraErroTanque({ code: 403, message: 'Valor inválido! Insira um número maior que 0' });
        errorFlag = true;
    }

    // Confere tCond 405
    if (isNaN(data.tCond) || ((data.fluido === 'R404A' || data.fluido === 'R134A' || data.fluido === 'R22' || data.fluido === 'R407C') && (data.tCond < 25 || data.tCond > 45))) {
        mostraErroTanque({ code: 404, message: 'Valor inválido! Insira um número entre 25 e 45' });
        errorFlag = true;
    }

    if (isNaN(data.tCond) || ((data.fluido === 'R410A') && (data.tCond < 30 || data.tCond > 45))) {
        mostraErroTanque({ code: 404, message: 'Valor inválido! Insira um número entre 30 e 45' });
        errorFlag = true;
    }

    if (isNaN(data.tCond) || ((data.fluido === 'R507A') && (data.tCond < 25 || data.tCond > 45))) {
        mostraErroTanque({ code: 404, message: 'Valor inválido! Insira um número entre 25 e 45' });
        errorFlag = true;
    }

    // Confere subresfriamento 406
    if (isNaN(data.subres) || data.subres > 50 || data.subres <= 0) {
        mostraErroTanque({ code: 405, message: 'Valor inválido! Insira um número maior que 0 e menor que 50' });
        errorFlag = true;
    }

    if (isNaN(data.evapVolume) || data.evapVolume <= 0) {
        mostraErroTanque({ code: 406, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.condVolume) || data.condVolume <= 0) {
        mostraErroTanque({ code: 407, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.compSuc) || data.compSuc <= 0) {
        mostraErroTanque({ code: 408, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.diamSuc) || data.diamSuc <= 0) {
        mostraErroTanque({ code: 409, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.compLinhaLiquido) || data.compLinhaLiquido <= 0) {
        mostraErroTanque({ code: 410, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.diamLinhaLiquido) || data.diamLinhaLiquido <= 0) {
        mostraErroTanque({ code: 411, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.compDesc) || data.compDesc <= 0) {
        mostraErroTanque({ code: 412, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.diamDesc) || data.diamDesc <= 0) {
        mostraErroTanque({ code: 413, message: 'Valor inválido!' });
        errorFlag = true;
    }

    if (isNaN(data.radioLocalizacao)) {
        mostraErroTanque({ code: 414, message: 'Valor inválido!' });
        errorFlag = true;
    }

    console.log(data.minEnchimento)

    if (isNaN(data.minEnchimento) || data.minEnchimento < 0.15) {
        mostraErroTanque({ code: 415, message: 'Valor inválido! Insira um numero maior que 15%' });
        errorFlag = true;
    } 

    return !errorFlag ? { code: 200, message: '' } : { code: 400, message: '' };

}

async function enviarDadosParaServidorTanque(data) {

    document.querySelector('.lds-dual-ring').style = 'display: flex';

    const returnedData = confereDadosTanque(data);
    if (returnedData.code != 200) return returnedData;

    try {

        const response = await fetch('http://54.91.172.64:3003/tanque', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const result = await response.json();
        if (result.code == 200) {
            volumeMassaTotal = result.message.volumeMassaTotal;
            massaTotal = result.message.massaTotal;
            massaEvap = result.message.massaEvap;
            massaCond = result.message.massaCond;
            massaSuc = result.message.massaSuc;
            massaLiq = result.message.massaLiq;
            massaDesc = result.message.massaDesc;
        }

        else {
            volumeMassaTotal = result.message;
            massaTotal = result.message;
            massaEvap = result.message;
            massaCond = result.message;
            massaSuc = result.message;
            massaLiq = result.message;
            massaDesc = result.message;
        }

        return result;

    }

    catch (error) {
        return { code: 900, message: 'Ocorreu um erro inesperado.' };
    }

}

function resetaStyleFormTanque() {

    document.getElementById('returned__tanque').style = 'display: none';

    const spansInSection = document.querySelectorAll('#formulario-tanque span');
    spansInSection.forEach(span => {
        span.textContent = '';
    });

    const inputsInForm = document.querySelectorAll('.form__conteudo div');
    inputsInForm.forEach(div => {
        div.style.removeProperty('box-shadow');
        div.style.removeProperty('outline');
    });

}

formularioTanque.addEventListener('submit', async function (event) {

    event.preventDefault();
    resetaStyleFormTanque();

    const data = {

        //capacidade: parseFloat(formularioTanque.querySelector('.form__secao__esquerda #capacidade').value),
        fluido: formularioTanque.querySelector('.form__secao__esquerda #refrigerante').value,
        tEvap: parseFloat(formularioTanque.querySelector('.form__secao__esquerda #tEvap').value),
        superaquecimento: parseFloat(formularioTanque.querySelector('.form__secao__esquerda #super').value),
        tCond: parseFloat(formularioTanque.querySelector('.form__secao__esquerda #tCond').value),
        subres: parseFloat(formularioTanque.querySelector('.form__secao__esquerda #subres').value),

        evapVolume: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #evap__volume').value),
        condVolume: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #cond__volume').value),

        compSuc: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #comprimento__suc').value),
        diamSuc: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #diametro__suc').value),

        compLinhaLiquido: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #comprimento__linhaliquido').value),
        diamLinhaLiquido: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #diametro__linhaliquido').value),

        compDesc: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #comprimento__desc').value),
        diamDesc: parseFloat(formularioTanque.querySelector('.form__secao__direita__tanque #diametro__desc').value),

        radioLocalizacao: formularioTanque.querySelector('.form__secao__abaixo__tanque #radioVertical').checked,
        minEnchimento: (parseFloat(formularioTanque.querySelector('.form__secao__abaixo__tanque #minEnc').value) / 100)

    };

    mostraResultadoTanque(await enviarDadosParaServidorTanque(data));

});