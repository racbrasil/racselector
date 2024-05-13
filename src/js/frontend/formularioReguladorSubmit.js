
class Regulador {

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
            this.mostraResultadoRegulador(result);
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

        if(dados.compressor === '') this.mostrarErrosFormulario(302, 'Compressor inválido!'), erro = true;

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
            const fetchPromise = fetch('http://54.91.172.64:3003/regulador', {
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

    mostraResultadoRegulador(data) {
        /* Essa função é responsavel por exibir erros ou resultados recebidos do back-end */
        // Quando é chamada, já houve uma resposta do servidor, logo o loading é tirado.
        document.querySelector('.lds-dual-ring').style = 'display: none';

        switch (data.code) {
            // Caso o código recebido dos dados do servidor seja 100, os parametros informados estão fora do padrão especificado
            case 100:
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__regulador').style = 'display: grid';
                // Desabilito o container de resultados
                document.getElementById('result__regulador-re2').style = 'display: none';
                document.getElementById('result__regulador-reb3').style = 'display: none';
                document.querySelector('#returned__regulador #result__info').style = 'display: none';
                // Habilito o container de erros
                document.getElementById('result__regulador__error').style = 'display: flex';
                // Informo o resultado.
                document.querySelector('#result__regulador__error span').textContent = 'Parâmetros fora de padrão.'
                break;

            // Caso o código recebido dos dados do servidor seja 200, há um resultado retornado
            case 200:
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__regulador').style = 'display: grid';
                // Habilito o container de resultados
                document.getElementById('result__regulador-re2').style = 'display: flex';
                document.getElementById('result__regulador-reb3').style = 'display: flex';
                // Desabilito o container de erros
                document.getElementById('result__regulador__error').style = 'display: none';

                document.querySelector('#result__regulador-re2 #nome').textContent = data.message.re2.nome
                document.querySelector('#result__regulador-re2 #codigo').textContent = data.message.re2.codigo
                document.querySelector('#result__regulador-re2 #adaptador').textContent = data.message.re2.adaptador
                document.querySelector('#result__regulador-re2 #pmt').textContent = data.message.re2.pmt
                document.querySelector('#result__regulador-re2 #ip').textContent = data.message.re2.ip
                document.querySelector('#result__regulador-re2 #tensao').textContent = data.message.re2.tensao
                document.querySelector('#result__regulador-re2 #codigo__regulador').textContent = data.message.re2.codigoAdaptador
                
                document.querySelector('#result__regulador-reb3 #nome').textContent = data.message.reb3.nome
                document.querySelector('#result__regulador-reb3 #codigo').textContent = data.message.reb3.codigo
                document.querySelector('#result__regulador-reb3 #adaptador').textContent = data.message.reb3.adaptador
                document.querySelector('#result__regulador-reb3 #pmt').textContent = data.message.reb3.pmt
                document.querySelector('#result__regulador-reb3 #ip').textContent = data.message.reb3.ip
                document.querySelector('#result__regulador-reb3 #tensao').textContent = data.message.reb3.tensao
                document.querySelector('#result__regulador-reb3 #codigo__regulador').textContent = data.message.reb3.codigoAdaptador
                console.log(data.message.reb3.codigoAdaptador === 'Não aplicado')
                if(data.message.reb3.codigoAdaptador === 'Não aplicado'){
                    document.querySelector('#returned__regulador #result__info').style = 'display: none';
                } else {
                    document.querySelector('#returned__regulador #result__info').style = 'display: block';
                }

                break;
            // Caso o código recebido dos dados do servidor seja 300, não foi encontrado nenhum resultado
            case 300:
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__regulador').style = 'display: flex';
                // Desabilito o container de resultados
                document.getElementById('result__regulador').style = 'display: none';
                // Habilito o container de erros
                document.getElementById('result__regulador__error').style = 'display: flex';
                // Informo que nenhuma valvula foi encontrada
                document.querySelector('#returned__regulador #result__info').style = 'display: none';
                document.querySelector('#result__regulador__error span').textContent = 'Nenhum regulador encontrado';
                break;

            // Caso o código recebido dos dados do servidor seja 900, ocorreu um erro no backend
            case 900:
                // Desabilito o container do loading
                document.getElementById('loading').style = 'display: none'
                // Habilito o container de informações retornadas da vee
                document.getElementById('returned__regulador').style = 'display: grid';
                document.querySelector('#returned__regulador #result__info').style = 'display: none';
                // Desabilito o container de resultados
                document.getElementById('result__regulador-re2').style = 'display: none';
                document.getElementById('result__regulador-reb3').style = 'display: none';
                // Habilito o container de erros
                document.getElementById('result__regulador__error').style = 'display: flex';
                // Informo que ocorreu um erro   
                document.querySelector('#returned__regulador #result__info').style = 'display: none';
                document.querySelector('#result__regulador__error span').textContent = 'Ocorreu um erro inesperado.';
                break;
        }
    }
}

reguladorFormulario = new Regulador('formulario-regulador')