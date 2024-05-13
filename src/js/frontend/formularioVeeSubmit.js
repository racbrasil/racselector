const formulario = document.getElementById('formulario-vee');
const section = document.getElementById('section');
const divs = formulario.querySelectorAll('div')

const resultValvula = document.getElementById('returned__vee');
const resultError = document.getElementById('result__error');
const messageError = document.getElementById('error__message');

formulario.addEventListener('submit', function (event) {

    let tEvapMax, tEvapMin, tCondMax, tCondMin, refrigeranteValue, preventDefaultCalled;
    resultValvula.style.display = 'none';
    resultError.style.display = 'none';

    divs.forEach((div) => {

        const span = div.querySelector('span');
        const input = div.querySelector('input');
        const secaoError = div.querySelector('div');
        const selectError = div.querySelector('select')
        const select = div.querySelector('select')
        switch (div.id) {

            case 'secao__capacidade':

                input.value === '' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                    input.value === '-' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault, preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                        input.value < 0.1 ? (span.textContent = 'Valor inválido! Insira um número maior que 0.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);')
                            : (span.textContent = '', secaoError.style = '')

                break;

            case 'secao__refrigerante':

                select.value === '' ? (span.textContent = 'Valor inválido! Selecione um refrigerante.', event.preventDefault(), preventDefaultCalled = true, selectError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);')
                    : (span.textContent = '', selectError.style = '')

                refrigeranteValue = select.value

                switch (select.value) {

                    case 'R410A':
                        tEvapMax = 10;
                        tEvapMin = -30;

                        tCondMax = 50;
                        tCondMin = 30;
                        break;

                    case 'R407C':
                        tEvapMax = 10;
                        tEvapMin = -40;

                        tCondMax = 50;
                        tCondMin = 25;
                        break;

                    case 'R22':
                        tEvapMax = 10;
                        tEvapMin = -40;

                        tCondMax = 50;
                        tCondMin = 25;
                        break;

                    case 'R134A':
                        tEvapMax = 10;
                        tEvapMin = -30;

                        tCondMax = 50;
                        tCondMin = 25;
                        break;

                    case 'R404A':
                        tEvapMax = 10;
                        tEvapMin = -40;

                        tCondMax = 50;
                        tCondMin = 25;
                        break;

                    case 'R744':
                        tEvapMax = -10;
                        tEvapMin = -40;

                        tCondMax = 0;
                        tCondMin = -5;
                        break;

                    case 'R507A':
                        tEvapMax = 5;
                        tEvapMin = -40;

                        tCondMax = 45;
                        tCondMin = 25;
                        break;


                }

                break;


            case 'secao__tEvap':

                input.value === '' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                    input.value === '-' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                        refrigeranteValue === '' ? (span.textContent = 'Valor inválido! Selecione um refrigerante. ', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                            input.value > tEvapMax ? (span.textContent = `Valor inválido! O valor máximo é: ${tEvapMax}`, event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                                input.value < tEvapMin ? (span.textContent = `Valor inválido! O valor mínimo é: ${tEvapMin}`, event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);')
                                    : (span.textContent = '', secaoError.style = '')

                break;

            case 'secao__super':

                input.value === '' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                    input.value === '-' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                        refrigeranteValue === '' ? (span.textContent = 'Valor inválido! Selecione um refrigerante. ', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                            input.value < 0.1 ? (span.textContent = 'Valor inválido! Insira um número maior que 0.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);')
                                : (span.textContent = '', secaoError.style = '')

                break;

            case 'secao__tCond':

                input.value === '' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                    input.value === '-' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                        refrigeranteValue === '' ? (span.textContent = 'Valor inválido! Selecione um refrigerante.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                            input.value > tCondMax ? (span.textContent = `Valor inválido! O valor máximo é: ${tCondMax}`, event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                                input.value < tCondMin ? (span.textContent = `Valor inválido! O valor mínimo é: ${tCondMin}`, event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);')
                                    : (span.textContent = '', secaoError.style = '')
                break;

            case 'secao__subres':

                input.value === '' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                    input.value === '-' ? (span.textContent = 'Valor inválido! Insira um número.', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                        input.value > 50 ? (span.textContent = 'Valor inválido! O valor máximo é 50', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);') :
                            input.value < 0.1 ? (span.textContent = 'Valor inválido! Insira um número maior que 0', event.preventDefault(), preventDefaultCalled = true, secaoError.style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);')
                                : (span.textContent = '', secaoError.style = '')

                break;

        }

    })

    event.preventDefault();

    if (preventDefaultCalled != true) {

        document.getElementById('loading').style.display = 'block'

        const data = {
            capacidade: parseFloat(document.getElementById('capacidade').value),
            refrigerante: document.getElementById('refrigerante').value,
            tEvap: parseFloat(document.getElementById('tEvap').value),
            superaquecimento: parseFloat(document.getElementById('super').value),
            tCond: parseFloat(document.getElementById('tCond').value),
            subres: parseFloat(document.getElementById('subres').value),
            tipoValvula: document.getElementById('selectTipoValvula').value
        }

        fetch('http://18.232.139.103:3003/server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })

            .then(data => {
                if (data.code == 200) {
                    document.getElementById('loading').style.display = 'none'

                    resultValvula.style.display = 'flex';
                    resultError.style.display = 'none';

                    const tipo = document.getElementById('tipo');
                    tipo.textContent = data.message.tipo;

                    const valvulaImg = document.getElementById('valvulaImg');
                    const tipoValvula = document.getElementById('tipoValvula');
                    data.message.tipo === 'EPV'
                        ? (tipoValvula.textContent = 'Orificio', valvulaImg.src = '../docs/vee-nobg.png')
                        : (tipoValvula.textContent = 'Modelo', valvulaImg.src = '../docs/esv-nobg.png')

                    const modelo = document.getElementById('modelo');
                    modelo.textContent = data.message.modelo;

                    const capacidadeValvula = document.getElementById('capacidadeValvula');
                    capacidadeValvula.textContent = data.message.capacidade.toFixed(2);

                    const uso = document.getElementById('uso');
                    uso.textContent = ((capacidade.value * 100) / data.message.capacidade).toFixed(1) + '%';

                    const codigo = document.getElementById('codigo');
                    codigo.textContent = data.message.codigo;

                    const kv = document.getElementById('kV');
                    kv.textContent = data.message.kv;

                    const entrada = document.getElementById('entrada');
                    entrada.textContent = data.message.entrada;

                    const saida = document.getElementById('saida');
                    saida.textContent = data.message.saida;

                } else if (data.code == 101 || data.code == 102 || data.code == 103) {
                    document.getElementById('loading').style.display = 'none'

                    resultValvula.style.display = 'none';
                    resultError.style.display = 'flex';

                    messageError.innerHTML = `<strong>Erro ${data.code}:</strong> ${data.message}`;


                } else if (data.code == 303) {
                    document.getElementById('loading').style.display = 'none'

                    resultValvula.style.display = 'none';
                    resultError.style.display = 'flex';

                    messageError.innerHTML = 'Nenhuma válvula encontrada.';
                }

            })

            .catch(error => {
                document.getElementById('loading').style.display = 'none'

                resultValvula.style.display = 'none';
                resultError.style.display = 'flex';

                messageError.innerHTML = `Ocorreu um erro inesperado: <strong>${error}</strong>`;
            })

    }

})