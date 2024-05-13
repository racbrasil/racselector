const inputs = document.querySelectorAll('input[type="text"]');
const div = document.querySelectorAll('div')

inputs.forEach(input => {

    input.addEventListener('input', function () {

        this.value = this.value.replace(/[^0-9.,-]/g, '');  // Troca valores que não sejam número de 0 a 9, caracteres . e -, e vírgulas
        this.value = this.value.replace(/,/g, '.'); // Substitui vírgulas por pontos

        this.value = this.value.replace(/(\..*)\./g, '$1'); // Troca valores que estão entre pontos, deixando apenas o valor armazenado (o que está entre parenteses)
        this.value = this.value.replace(/(\-.*)\-/g, '$1'); // Troca valores que estão entre hifens, deixando apenas o valor armazenado (o que está entre parenteses)

        this.value = this.value[0] == '-' ? // Se o primeiro valor for '-'
            this.value[1] == '.' ? this.value[1] = this.value.slice(0, 1) : this.value // O segundo valor é um '.'? Se sim apague o ponto cortando do primeiro valor até o segundo (deixando o segundo de fora) e adicionando um caractere vazio. Se não, deixe o mesmo valor.
            : this.value = this.value[0] == '.' ? '' : this.value;// Se não a primeira letra é um ponto? Se sim troque por nada

        this.value = this.value.includes('.') ? this.value = this.value.slice(0, this.value.indexOf('.') + 3) : this.value; //O valor do input possui ponto? se sim, corte o valor do começo até o valor de onde está o ponto + 2, se não deixe como está

        this.value = this.value.length > 6 ? this.value.slice(0, 6) : this.value; // O tamanho do input é maior que 7? Se sim corte do zero até o 7, se não, mantenha o valor.

    })

})
