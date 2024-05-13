const formularioOil = document.getElementById('formulario-oil');
let retornoVariavel;

function mostraResultadoOil(data) {

    document.querySelector('.lds-dual-ring').style = 'display: none';

    switch (data.code) {

        case 100:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('returned__oil').style = 'display: flex';
            document.getElementById('result__oil').style = 'display: none';
            document.getElementById('result__oil__error').style = 'display: flex';

            document.querySelector('#result__oil__error span').textContent = data.message;
            break;

        case 200:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('result__oil').style = 'display: grid';
            document.getElementById('returned__oil').style = 'display: flex';
            document.getElementById('result__oil__error').style = 'display: none';

            document.querySelector('#returned__oil #codigo p').textContent = data.message.oilPack.codigo;
            document.querySelector('#returned__oil #modelo p').textContent = data.message.oilPack.modelo;
            //document.querySelector('#returned__oil #altura p').textContent = data.message.oilPack.altura;
            //document.querySelector('#returned__oil #diametro p').textContent = data.message.oilPack.diametro;
            document.querySelector('#returned__oil #volume p').textContent = data.message.oilPack.volume;
            break;

        case 300:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('returned__oil').style = 'display: flex';
            document.getElementById('result__oil').style = 'display: none';
            document.getElementById('result__oil__error').style = 'display: flex';

            document.querySelector('#result__oil__error span').textContent = data.message;
            break;

        case 900:
            document.getElementById('loading').style = 'display: none'
            document.getElementById('returned__oil').style = 'display: flex';
            document.getElementById('result__oil').style = 'display: none';
            document.getElementById('result__oil__error').style = 'display: flex';

            document.querySelector('#result__oil__error span').textContent = 'Ocorreu um erro inesperado.';
            break;

    }

}

function mostraErroOil(erro, secao) {

    if (secao === 1) {

        switch (erro.code) {

            case 400:
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__refrigerante span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda div select').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 401:
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__tEvap span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__tEvap div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 402:
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__tCond span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__tCond div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 403:
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #qtdeCompressores span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #qtdeCompressores div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 404:
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__massaCompressor span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__massaCompressor div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 405:
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__tDescarga span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__esquerda #secao__tDescarga div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

        };

    }

    else if (secao === 2) {

        switch (erro.code) {

            case 400:
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__refrigerante span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__direita div select').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 401:
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__tEvap span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__tEvap div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 402:
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__tCond span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__tCond div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 403:
                formularioOil.querySelector('#formulario-oil .form__secao__direita #qtdeCompressores span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__direita #qtdeCompressores div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 404:
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__massaCompressor span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__massaCompressor div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

            case 405:
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__tDescarga span').textContent = erro.message;
                formularioOil.querySelector('#formulario-oil .form__secao__direita #secao__tDescarga div').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
                break;

        };

    }

}

function confereDadosOil(data) {

    let testValue = false;
    let errorFlag = false;

    if (data.nRegimes === 1) {

        for (let i = 0; i < formularioOil.querySelector('#refrigerante').options.length; i++) {
            let optionValue = formularioOil.querySelector('#refrigerante').options[i].value;
            if (data.fluido === optionValue) testValue = true;
        }

        if (testValue !== true) mostraErroOil({ code: 400, message: 'Selecione um refrigerante.' }, 1), errorFlag = true;
        //
        if (isNaN(data.tEvap) || data.tEvap > 10 || (data.fluido === 'R404A' && data.tEvap < -40) || (data.fluido === 'R22' && data.tEvap < -40) || (data.fluido === 'R134A' && data.tEvap < -30)) {
            mostraErroOil({ code: 401, message: 'Valor inválido! Insira um número entre -40 e 10' }, 1);
            errorFlag = true;
        }

        if (isNaN(data.tCond) || data.tCond > 45 || data.tCond < 35) {
            mostraErroOil({ code: 402, message: 'Valor inválido! Insira um número entre 35 e 45.' }, 1);
            errorFlag = true;
        }

        if (isNaN(data.nCompressores)) {
            mostraErroOil({ code: 403, message: 'Valor inválido! Insira um número.' }, 1);
            errorFlag = true;
        }

        if (data.vMassa <= 0 || isNaN(data.vMassa)) {
            mostraErroOil({ code: 404, message: 'Valor inválido! Insira um número maior que 0.' }, 1);
            errorFlag = true;
        }

        if (data.fluido == 'R404A' && (data.tDesc < 70 || data.tDesc > 115 || isNaN(data.tDesc))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 70 e 115.' }, 1);
            errorFlag = true;
        }

        if (data.fluido == 'R22' && (data.tDesc < 80 || data.tDesc > 120 || isNaN(data.tDesc))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 80 e 120.' }, 1);
            errorFlag = true;
        }

        if (data.fluido == 'R134A' && (data.tDesc < 60 || data.tDesc > 100 || isNaN(data.tDesc))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 60 e 100' }, 1);
            errorFlag = true;
        }

        return !errorFlag ? { code: 200, message: '' } : { code: 400, message: '' };
    }

    if (data.nRegimes === 2) {

        for (let i = 0; i < formularioOil.querySelector('.form__secao__esquerda #refrigerante').options.length; i++) {
            let optionValue = formularioOil.querySelector('.form__secao__esquerda #refrigerante').options[i].value;
            if (data.fluido === optionValue) testValue = true;
        }

        if (testValue !== true) mostraErroOil({ code: 400, message: 'Selecione um refrigerante.' }, 1), errorFlag = true;

        testValue = false;

        /*
        for (let i = 0; i < formularioOil.querySelector('.form__secao__direita #refrigerante').options.length; i++) {
            let optionValue = formularioOil.querySelector('.form__secao__direita #refrigerante').options[i].value;
            if (data.fluido[1] === optionValue) testValue = true;
        }

        if (testValue !== true) mostraErroOil({ code: 400, message: 'Selecione um refrigerante.' }, 2), errorFlag = true;
         */

        if (isNaN(data.tEvap[0]) || data.tEvap[0] > 10 || (data.fluido === 'R404A' && data.tEvap[0] < -40) || (data.fluido === 'R22' && data.tEvap[0] < -40) || (data.fluido === 'R134A' && data.tEvap[0] < -40)) {
            mostraErroOil({ code: 401, message: 'Valor inválido! Insira um número entre -40 e 10' }, 1);
            errorFlag = true;
        }

        if (isNaN((data.tEvap[1])) || data.tEvap[1] > 10 || (data.fluido === 'R404A' && data.tEvap[0] < -40) || (data.fluido === 'R22' && data.tEvap[1] < -40) || (data.fluido === 'R134A' && data.tEvap[1] < -40)) {
            mostraErroOil({ code: 401, message: 'Valor inválido! Insira um número entre -40 e 10' }, 2);
            errorFlag = true;
        }

        if (isNaN(data.tCond[0]) || data.tCond[0] > 45 || data.tCond[0] < 35) {
            mostraErroOil({ code: 402, message: 'Valor inválido! Insira um número entre 35 e 45.' }, 1);
            errorFlag = true;
        }

        if (isNaN(data.tCond[1]) || data.tCond[1] > 45 || data.tCond[1] < 35) {
            mostraErroOil({ code: 402, message: 'Valor inválido! Insira um número entre 35 e 45.' }, 2);
            errorFlag = true;
        }

        if (isNaN(data.nCompressores[0])) {
            mostraErroOil({ code: 403, message: 'Valor inválido! Insira um número.' }, 1);
            errorFlag = true;
        }

        if (isNaN(data.nCompressores[1])) {
            mostraErroOil({ code: 403, message: 'Valor inválido! Insira um número.' }, 2);
            errorFlag = true;
        }

        if (data.vMassa[0] <= 0 || isNaN(data.vMassa[0])) {
            mostraErroOil({ code: 404, message: 'Valor inválido! Insira um número maior que 0.' }, 1);
            errorFlag = true;
        }

        if (data.vMassa[1] <= 0 || isNaN(data.vMassa[1])) {
            mostraErroOil({ code: 404, message: 'Valor inválido! Insira um número maior que 0.' }, 2);
            errorFlag = true;
        }

        if (data.fluido[0] == 'R404A' && (data.tDesc[0] < 70 || data.tDesc[0] > 115 || isNaN(data.tDesc[0]))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 70 e 115.' }, 1);
            errorFlag = true;
        }

        if (data.fluido[0] == 'R22' && (data.tDesc[0] < 80 || data.tDesc[0] > 120 || isNaN(data.tDesc[0]))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 80 e 120.' }, 1);
            errorFlag = true;
        }

        if (data.fluido[0] == 'R134A' && (data.tDesc[0] < 60 || data.tDesc[0] > 100 || isNaN(data.tDesc[0]))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 60 e 100' }, 1);
            errorFlag = true;
        }

        if (data.fluido[1] == 'R404A' && (data.tDesc[1] < 70 || data.tDesc[1] > 115 || isNaN(data.tDesc[1]))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 70 e 115.' }, 2);
            errorFlag = true;
        }

        if (data.fluido[1] == 'R22' && (data.tDesc[1] < 80 || data.tDesc[1] > 120 || isNaN(data.tDesc[1]))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 80 e 120.' }, 2);
            errorFlag = true;
        }

        if (data.fluido[1] == 'R134A' && (data.tDesc[1] < 60 || data.tDesc[1] > 100 || isNaN(data.tDesc[1]))) {
            mostraErroOil({ code: 405, message: 'Valor inválido! Insira um número entre 60 e 100' }, 2);
            errorFlag = true;
        }

        return !errorFlag ? { code: 200, message: '' } : { code: 400, message: '' };
    }

}

async function enviarDadosParaServidorOil(data) {

    document.querySelector('.lds-dual-ring').style = 'display: flex';

    const returnedData = confereDadosOil(data);
    if (returnedData.code != 200) return returnedData;

    try {

        const response = await fetch('http://54.91.172.64:3003/oil-pack', {
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
        retornoVariavel = result.message.vazaoVolumetrica
        console.log(result)
        return result;

    }

    catch (error) {
        return { code: 900, message: 'Ocorreu um erro inesperado.' };
    }

}

function resetaStyleFormOil() {

    document.getElementById('returned__oil').style = 'display: none';

    const spansInSection = document.querySelectorAll('#formulario-oil span');
    spansInSection.forEach(span => {
        span.textContent = '';
    });

    const inputsInForm = document.querySelectorAll('.form__secao div');
    inputsInForm.forEach(div => {
        div.style.removeProperty('box-shadow');
        div.style.removeProperty('outline');
    });

}

formularioOil.addEventListener('submit', async function (event) {

    event.preventDefault();
    resetaStyleFormOil();

    if (formularioOil.querySelector('#radio1').checked) {

        const data = {
            nRegimes: 1,
            fluido: formularioOil.querySelector('.form__secao__esquerda #refrigerante').value,
            tEvap: parseFloat(formularioOil.querySelector('.form__secao__esquerda #tEvap').value),
            tCond: parseFloat(formularioOil.querySelector('.form__secao__esquerda #tCond').value),
            nCompressores: parseFloat(formularioOil.querySelector('.form__secao__esquerda #qtdeCompressores').value),
            vMassa: parseFloat(formularioOil.querySelector('.form__secao__esquerda #massaCompressor').value),
            tDesc: parseFloat(formularioOil.querySelector('.form__secao__esquerda #tDescarga').value)
        };

        mostraResultadoOil(await enviarDadosParaServidorOil(data));

    } else if (formularioOil.querySelector('#radio2').checked) {

        const data = {
            nRegimes: 2,
            fluido: formularioOil.querySelector('.form__secao__esquerda #refrigerante').value,
            tEvap: [parseFloat(formularioOil.querySelector('.form__secao__esquerda #tEvap').value), parseFloat(formularioOil.querySelector('.form__secao__direita #tEvap').value)],
            tCond: [parseFloat(formularioOil.querySelector('.form__secao__esquerda #tCond').value), parseFloat(formularioOil.querySelector('.form__secao__direita #tCond').value)],
            nCompressores: [parseFloat(formularioOil.querySelector('.form__secao__esquerda #qtdeCompressores').value), parseFloat(formularioOil.querySelector('.form__secao__direita #qtdeCompressores').value)],
            vMassa: [parseFloat(formularioOil.querySelector('.form__secao__esquerda #massaCompressor').value), parseFloat(formularioOil.querySelector('.form__secao__direita #massaCompressor').value)],
            tDesc: [parseFloat(formularioOil.querySelector('.form__secao__esquerda #tDescarga').value), parseFloat(formularioOil.querySelector('.form__secao__esquerda #tDescarga').value)]
        };

        mostraResultadoOil(await enviarDadosParaServidorOil(data));

    }

});