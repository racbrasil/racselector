// ==========================================================================================================
// --- Formulario Tanque

// --- Variáveis para elementos do formulário Tanque
const tanqueButton = document.getElementById('tanqueButton');
const tanqueForm = document.getElementById('formulario-tanque');
const resultTanque = document.getElementById('returned__tanque');

const formButtonTanque = document.getElementById('botao-formulario-tanque');
const botaoDocTanque = document.getElementById('botao-doc-tanque');
const botaoAjudaTanque = document.getElementById('botao-ajuda-tanque');

const radioVertical = document.getElementById('radioVertical');

// ==========================================================================================================

// ==========================================================================================================
// --- Formulario Vee

// --- Variaveis para elementos do formulário Vee
const valvulaButton = document.getElementById('valvulaButton');
const resultVee = document.getElementById('returned__vee');
const veeForm = document.getElementById('formulario-vee');

const formButtonVee = document.getElementById('botao-formulario-vee');
const botaoDocVee = document.getElementById('botao-doc-vee');
const botaoAjudaVee = document.getElementById('botao-ajuda-vee');

const circuitoButton = document.getElementById('circuitoButton');
const circuitoButtonFecha = document.querySelector('.circuito__header__button');
const circuitoSection = document.querySelector('.circuito__section');
const circuitoConteudo = document.querySelector('.circuito__conteudo');

// ==========================================================================================================

// ==========================================================================================================
// --- Formulario Oil Pack

// --- Variáveis para elementos do formulário Oil Pack
const oilPackForm = document.getElementById('formulario-oil');
const oilButton = document.getElementById('oilButton');
const resultOilPack = document.getElementById('returned__oil');
const formButtonOil = document.getElementById('botao-formulario-oil');
const botaoDocOil = document.getElementById('botao-doc-oil');
const botaoAjudaOil = document.getElementById('botao-ajuda-oil');
const OilRadio1 = document.querySelector('#radio1');
const OilRadio2 = document.querySelector('#radio2');
const formOilDirSection = document.querySelector('#formulario-oil .form__secao__direita');
const oilFluidoDireita = document.querySelector('#formulario-oil .form__secao__direita #refrigerante');
const oilFluidoEsquerda = document.querySelector('#formulario-oil .form__secao__esquerda #refrigerante');
const oilTCondEsquerda = document.querySelector('#formulario-oil .form__secao__esquerda #tCond');
const oilTCondDireita = document.querySelector('#formulario-oil .form__secao__direita #tCond');

// ==========================================================================================================

// ==========================================================================================================
// --- Formulario Ventilador

// --- Variáveis para elementos do formulário Ventilador
const ventiladorButton = document.getElementById('ventiladorButton');
const ventiladorForm = document.getElementById('formulario-ventilador');

const formVent = document.getElementById('formulario-ventilador')
const formButtonVent = document.getElementById('botao-formulario-vent');
const botaoDocVent = document.getElementById('botao-doc-vent');
const botaoAjudaVent = document.getElementById('botao-ajuda-vent');

const resultVent = document.getElementById('returned__ventilador');

// ==========================================================================================================

// ==========================================================================================================
// --- Formulario Regulador

// --- Variáveis para elementos do formulário Ventilador
const reguladorButton = document.getElementById('reguladorButton');
const reguladorForm = document.getElementById('formulario-regulador');

const formButtonRegulador = document.getElementById('botao-formulario-regulador');
const botaoDocRegulador = document.getElementById('botao-doc-regulador');
const botaoAjudaRegulador = document.getElementById('botao-ajuda-regulador');

const resultRegulador = document.getElementById('returned__regulador');

// ==========================================================================================================

// Event listener para sincronizar os campos de temperatura de condensação entre as seções esquerda e direita do formulario
oilTCondEsquerda.addEventListener('input', () => {
    oilTCondDireita.value = oilTCondEsquerda.value;
})

/*radioVertical.addEventListener('click', () => {
  //  radioHorizontal.checked = false;
});

radioHorizontal.addEventListener('click', () => {
    radioVertical.checked = false;
});*/

oilFluidoEsquerda.addEventListener('click', () => {
    oilFluidoDireita.selectedIndex = oilFluidoEsquerda.selectedIndex;
})

OilRadio1.addEventListener('click', () => {
    OilRadio2.checked = false;
    formOilDirSection.style = 'display: none';
})

OilRadio2.addEventListener('click', () => {
    OilRadio1.checked = false;
    formOilDirSection.style = 'display: grid';
})

circuitoButton.addEventListener('click', () => {

    const tEvapData = document.querySelector('.imagem__conteudo__tEvap');
    const tCondData = document.querySelector('.imagem__conteudo__tCond');
    const superData = document.querySelector('.imagem__conteudo__super');
    const subData = document.querySelector('.imagem__conteudo__sub');

    const tEvapValue = (veeForm.querySelector('#tEvap').value);
    const superValue = (veeForm.querySelector('#super').value);

    const tCondValue = (veeForm.querySelector('#tCond').value);
    const subresValue = (veeForm.querySelector('#subres').value);

    if (circuitoSection.classList.contains('enabled')) {
        circuitoSection.classList.remove('enabled');

    } else {

        circuitoSection.classList.add('enabled');

        if(tEvapValue !== ''){
            tEvapData.textContent = tEvapValue + 'ºC';
        }

        if(superValue !== '' && tEvapValue !== ''){
            superData.textContent =  (parseFloat(tEvapValue) + parseFloat(superValue)) + 'ºC'
        }
        
        if(tCondValue !== ''){
            tCondData.textContent = tCondValue + 'ºC';
        }
        
        if(subresValue !== '' && tCondValue !== ''){
            subData.textContent = tCondValue - subresValue + 'ºC'
        }

    }

});

circuitoButtonFecha.addEventListener('click', () => {

    if (circuitoSection.classList.contains('enabled')) {
        circuitoSection.classList.remove('enabled');

    } else {
        circuitoSection.classList.add('enabled');

    }

});

circuitoSection.addEventListener('click', function (event) {

    if (circuitoSection.classList.contains('enabled') && !circuitoConteudo.contains(event.target)) {
        circuitoSection.classList.remove('enabled');
    } else if (!circuitoConteudo.contains(event.target)) {
        circuitoSection.classList.add('enabled');

    }

});

valvulaButton.addEventListener('click', () => {

    valvulaButton.classList.add('selected');
    tanqueButton.classList.remove('selected');
    ventiladorButton.classList.remove('selected');
    oilButton.classList.remove('selected');
    reguladorButton.classList.remove('selected');
    
    oilPackForm.style = "display: none";
    veeForm.style = "display: grid";
    tanqueForm.style = "display: none";
    formVent.style = 'display: none'
    reguladorForm.style = 'display: none'

    formButtonOil.style = "display: none";
    formButtonTanque.style = "display: none";
    formButtonVee.style = "display: block";
    formButtonVent.style = "display: none" 
    formButtonRegulador.style = "display: none"

    circuitoButton.style = "display: flex";

    resultOilPack.style = "display: none";
    resultTanque.style = "display: none";
    resultVent.style = "display: none";
    resultRegulador.style = "display: none";

    botaoDocVee.style = "display: flex";
    botaoDocOil.style = "display: none";
    botaoDocTanque.style = "display: none";
    botaoDocVent.style = "display: none"
    botaoDocRegulador.style = "display: none"

    botaoAjudaVee.style = "display: flex";
    botaoAjudaOil.style = "display: none";
    botaoAjudaTanque.style = "display: none";
    botaoAjudaVent.style = "display: none"
    botaoAjudaRegulador.style = 'display: none'

});

tanqueButton.addEventListener('click', () => {

    valvulaButton.classList.remove('selected');
    tanqueButton.classList.add('selected');
    oilButton.classList.remove('selected');
    ventiladorButton.classList.remove('selected');
    reguladorButton.classList.remove('selected')

    circuitoButton.style = "display: none";
    
    veeForm.style = "display: none";
    oilPackForm.style = "display: none";
    tanqueForm.style = "display: grid";
    formVent.style = 'display: none'
    reguladorForm.style = 'display: none'

    formButtonOil.style = "display: none";
    formButtonVee.style = "display: none";
    formButtonTanque.style = "display: block";
    formButtonVent.style = "display: none"  
    formButtonRegulador.style = "display: none"

    botaoDocVee.style = "display: none";
    botaoDocOil.style = "display: none";
    botaoDocTanque.style = "display: flex";
    botaoDocVent.style = "display: none"
    botaoDocRegulador.style = "display: none"

    botaoAjudaVee.style = "display: none";
    botaoAjudaOil.style = "display: none";
    botaoAjudaTanque.style = "display: flex";
    botaoAjudaVent.style = "display: none"
    botaoAjudaRegulador.style = 'display: none'

    resultOilPack.style = "display: none";
    resultVee.style = "display: none";
    resultVent.style = "display: none";
    resultRegulador.style = "display: none";

});

oilButton.addEventListener('click', () => {

    valvulaButton.classList.remove('selected');
    tanqueButton.classList.remove('selected');
    oilButton.classList.add('selected');
    ventiladorButton.classList.remove('selected');
    reguladorButton.classList.remove('selected')

    oilPackForm.style = "display: grid";
    veeForm.style = "display: none";
    tanqueForm.style = "display: none";
    formVent.style = 'display: none'
    reguladorForm.style = 'display: none'

    formButtonOil.style = "display: block";
    formButtonVee.style = "display: none";
    formButtonTanque.style = "display: none"
    formButtonVent.style = "display: none"   
    formButtonRegulador.style = "display: none"

    circuitoButton.style = "display: none";

    resultVee.style = "display: none";
    resultTanque.style = "display: none";
    resultVent.style = "display: none";
    resultRegulador.style = "display: none";

    botaoDocVee.style = "display: none";
    botaoDocOil.style = "display: flex";
    botaoDocTanque.style = "display: none";
    botaoDocVent.style = "display: none"
    botaoDocRegulador.style = "display: none"
    botaoAjudaRegulador.style = 'display: none'

    botaoAjudaVee.style = "display: none";
    botaoAjudaOil.style = "display: flex";
    botaoAjudaTanque.style = "display: none";
    botaoAjudaVent.style = "display: none"

});

reguladorButton.addEventListener('click', () => {

    valvulaButton.classList.remove('selected');
    tanqueButton.classList.remove('selected');
    oilButton.classList.remove('selected');
    ventiladorButton.classList.remove('selected');
    reguladorButton.classList.add('selected')
    
    oilPackForm.style = "display: none";
    veeForm.style = "display: none";
    tanqueForm.style = "display: none";
    formVent.style = 'display: none'
    reguladorForm.style = 'display: grid'

    formButtonOil.style = "display: none";
    formButtonVee.style = "display: none";
    formButtonTanque.style = "display: none";
    formButtonVent.style = "display: none"; 
    formButtonRegulador.style = "display: block"

    circuitoButton.style = "display: none";

    resultVee.style = "display: none";
    resultTanque.style = "display: none";
    resultVent.style = "display: none";
    resultOilPack.style = "display: none";

    botaoDocVee.style = "display: none";
    botaoDocOil.style = "display: none";
    botaoDocTanque.style = "display: none";
    botaoDocVent.style = "display: none"
    botaoDocRegulador.style = "display: flex"

    botaoAjudaVee.style = "display: none";
    botaoAjudaOil.style = "display: none";
    botaoAjudaTanque.style = "display: none";
    botaoAjudaVent.style = "display: none"
    botaoAjudaRegulador.style = 'display: flex'

});

ventiladorButton.addEventListener('click', () => {

    valvulaButton.classList.remove('selected');
    tanqueButton.classList.remove('selected');
    oilButton.classList.remove('selected');
    ventiladorButton.classList.add('selected');
    reguladorButton.classList.remove('selected');

    tanqueForm.style = "display: none";
    oilPackForm.style = "display: none";
    veeForm.style = "display: none";
    formVent.style = 'display: grid'
    reguladorForm.style = 'display: none'

    botaoDocVee.style = "display: none";
    botaoDocOil.style = "display: none";
    botaoDocTanque.style = "display: none";
    botaoDocVent.style = "display: flex"
    botaoDocRegulador.style = "display: none"

    formButtonOil.style = "display: none";
    formButtonTanque.style = "display: none";
    formButtonVee.style = "display: none";
    formButtonVent.style = "display: flex"    
    formButtonRegulador.style = "display: none"    
    
    botaoAjudaVee.style = "display: none";
    botaoAjudaOil.style = "display: none";
    botaoAjudaTanque.style = "display: none";
    botaoAjudaVent.style = "display: flex"
    botaoAjudaRegulador.style = "display: none"

    circuitoButton.style = "display: none";

    resultTanque.style = "display: none";
    resultadoVee.style = "display: none";
    resultadoOil.style = "display: none";
    resultRegulador.style = "display: none";

});

const resultadoVee = document.getElementById('returned__vee');
veeForm.addEventListener('input', function(event){

    if(event.target.tagName === 'INPUT') {
        resultadoVee.style = "display: none";
    }

    if(event.target.tagName === 'SELECT') {
        resultadoVee.style = "display: none";
    }

})

const resultadoOil = document.getElementById('returned__oil');
oilPackForm.addEventListener('input', function(event){

    if(event.target.tagName === 'INPUT') {
        resultadoOil.style = "display: none";
    }

    if(event.target.tagName === 'SELECT') {
        resultadoOil.style = "display: none";
    }

})

const resultadoTanque = document.getElementById('returned__tanque');
tanqueForm.addEventListener('input', function(event){

    if(event.target.tagName === 'INPUT') {
        resultadoTanque.style = "display: none";
    }

    if(event.target.tagName === 'SELECT') {
        resultadoTanque.style = "display: none";
    }

})

const resultadoVent = document.getElementById('returned__ventilador');
formVent.addEventListener('input', function(event){

    if(event.target.tagName === 'INPUT') {
        resultadoVent.style = "display: none";
    }

    if(event.target.tagName === 'SELECT') {
        resultadoVent.style = "display: none";
    }

})

const resultadoRegulador = document.getElementById('returned__regulador');
reguladorForm.addEventListener('input', function(event){

    if(event.target.tagName === 'INPUT') {
        resultadoRegulador.style = "display: none";
    }

    if(event.target.tagName === 'SELECT') {
        resultadoRegulador.style = "display: none";
    }

})