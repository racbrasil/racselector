
class Ventilador {

    constructor(formulario) {
        this.formulario = document.getElementById(formulario)
        this.formulario.addEventListener('submit', this.enviar.bind(this))
    }

    async enviar(event) {
        event.preventDefault();

        this.dados = this.obterDados();
        const validaMessage = this.validarDados(this.dados);
        if (validaMessage != true) {
            const result = await this.enviarDadosParaServidor(this.dados);
            this.mostraResultadoVent(result);
        }
    }

    obterDados() {
        return {
            fabricante: this.formulario.querySelector('#fabricante').value,
            compressor: this.formulario.querySelector('#compressor').value
        }
    }

    validarDados(dados) {

        let erro = false;
        if (dados.fabricante === '') this.mostrarErrosFormulario(301, 'Fabricante inválido!'), erro = true;
        if (dados.fabricante !== 'Bitzer') this.mostrarErrosFormulario(301, 'Fabricante inválido!'), erro = true;

        //if(dados.compressor === '') this.mostrarErrosFormulario(302, 'Compressor inválido!'), erro = true;
        return erro
    }

    mostrarErrosFormulario(erro, message) {

        if (erro === 301) {
            this.formulario.querySelector('#secao__fabricante span').textContent = message;
            this.formulario.querySelector('#secao__fabricante select').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
        }

        if (erro === 302) {
            this.formulario.querySelector('#secao__compressor span').textContent = message;
            this.formulario.querySelector('#secao__compressor select').style = 'outline: solid 1px rgb(255, 0, 0); box-shadow: 1px 1px 12px rgb(200, 100, 100);';
        }

    }

    async enviarDadosParaServidor(dados) {

        try {
            document.querySelector('.lds-dual-ring').style = 'display: flex';
            const fetchPromise = fetch('http://54.91.172.64:3003/vent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Tempo limite de conexão excedido')), 5000)
            );

            const response = await Promise.race([fetchPromise, timeout]);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const result = await response.json();
            console.log(result)
            return result;
        }
        catch (error) {
            return { code: 900, message: 'Ocorreu um erro inesperado.' };
        }
    }

    mostraResultadoVent(data) {
        /* Essa função é responsavel por exibir erros ou resultados recebidos do back-end */
        // Quando é chamada, já houve uma resposta do servidor, logo o loading é tirado.
        document.querySelector('.lds-dual-ring').style = 'display: none';

        switch (data.code) {
            // Caso o código recebido dos dados do servidor seja 100, os parametros informados estão fora do padrão especificado
            case 100:
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__ventilador').style = 'display: flex';
                // Desabilito o container de resultados
                document.getElementById('result__ventilador').style = 'display: none';
                // Habilito o container de erros
                document.getElementById('result__ventilador__error').style = 'display: flex';
                // Informo o resultado.
                document.querySelector('#result__ventilador__error span').textContent = 'Parâmetros fora de padrão.'
                break;

            // Caso o código recebido dos dados do servidor seja 200, há um resultado retornado
            case 200:
                console.log('200')
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__ventilador').style = 'display: flex';
                // Habilito o container de resultados
                document.getElementById('result__ventilador').style = 'display: flex';
                // Desabilito o container de erros
                document.getElementById('result__ventilador__error').style = 'display: none';

                document.querySelector('#result__ventilador #modelo').textContent = data.message.modelo
                document.querySelector('#result__ventilador #codigo').textContent = data.message.codigo
                document.getElementById('tamanho').textContent = data.message.tamanho
                document.querySelector('#result__ventilador #rpm').textContent = data.message.rpm
                document.querySelector('#result__ventilador #nFases').textContent = data.message.nFases
                document.querySelector('#result__ventilador #tensao').textContent = data.message.tensao
                document.querySelector('#result__ventilador #frequencia').textContent = data.message.frequencia

                break;
            // Caso o código recebido dos dados do servidor seja 300, não foi encontrado nenhum resultado
            case 300:
                console.log('300')
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__ventilador').style = 'display: flex';
                // Desabilito o container de resultados
                document.getElementById('result__ventilador').style = 'display: none';
                // Habilito o container de erros
                document.getElementById('result__ventilador__error').style = 'display: flex';
                // Informo que nenhuma valvula foi encontrada
                document.querySelector('#result__ventilador__error span').textContent = 'Nenhum ventilador encontrado';
                break;

            // Caso o código recebido dos dados do servidor seja 900, ocorreu um erro no backend
            case 900:
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__ventilador').style = 'display: flex';
                // Desabilito o container de resultados
                document.getElementById('result__ventilador').style = 'display: none';
                // Habilito o container de erros
                document.getElementById('result__ventilador__error').style = 'display: flex';
                // Informo que ocorreu um erro   
                document.querySelector('#result__ventilador__error span').textContent = 'Ocorreu um erro inesperado.';
                break;
        }
    }
}

ventiladorFormulario = new Ventilador('formulario-ventilador')