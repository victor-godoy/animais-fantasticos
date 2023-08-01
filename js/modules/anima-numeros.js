export default class AnimaNumeros {
  // essa funcao só ocorre dentro do meu ( fetchAnimais )

  constructor(numeros, observerTarget, observerClass) {
    // geralmente tudo que esta em string é oque o usuario pode passar para usar
    this.numeros = document.querySelectorAll(numeros);

    // const observerTarget = document.querySelector(this.observerTarget);
    this.observerTarget = document.querySelector(observerTarget);

    // observar a classe 'ativo '
    this.observerClass = observerClass;

    // bind o this do obj ao this da mutacao
    this.handleMutation = this.handleMutation.bind(this);
  }

  // recebe um elemento do dom, com um numero em seu texto
  // incrementa apartir de 0 ate o numero final
  static incrementarNumero(numero) {
    // essa parte não precisa de nenhum ( this ) aqui dentro pois não precisa acessar nada de fora dela. Então posso definir ela como uma funcao ( static )

    // o problema é que não podemos utilizar uma funcao static usando o ( this.metodo ) para conseguir usar ela temos que puxar no construtor dela ( this.constructor.nome_método() )

    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // ativa incrementar numero para cada
  // numero selecionado no dom
  animaNumeros() {
    this.numeros.forEach((numero) =>
      this.constructor.incrementarNumero(numero)
    );
  }

  // funcao que ocorre quando a mutacao ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      // // vai observar a classe 'ativo' eu passei como uma propriedade no caso (observerClass)
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // adiciona o MutationObserver para verificar
  // quando a classe 'ativo' é adicionada ao elemento target
  addMutationObserver() {
    // observador de mutacao
    this.observer = new MutationObserver(this.handleMutation);
    // (observer) vai ser o método do meu obj principal (ele é criado aqui e colocado como método na minha classe )
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
