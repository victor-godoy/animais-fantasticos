export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    this.checkDistance = this.checkDistance.bind(this);
  }

  // pegar a distancia de cada item em relacao ao topo do site
  getDistance() {
    // é interessante eu rodar essa funcao (getDistance) só uma vez
    // pega cada numero dessa distancia e colocar em um objeto para eu ter referencia a esse obj

    // eu vou querer o retorno que sai dessa função (this.sections) para isso uso o (map)
    //  o map só funciona em array e o meu (sections) é uma nodeList, para transformar em uma
    // array podemos desestruturar ficando [...this.sections]

    // agora o que vou retornar dessa (sections) vai ser cada vai ser cada item da minha array

    this.distance = [...this.sections].map((section) => {
      // a primeira coisa que ele pega é o top ( que é o top do scroll em relacao a secao  )
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowMetade),
        // para a animacao nao acontecer somente quando a secao tocar no topo da tela
      };
      // vai pegar o número do topo independentemente de onde eu esteja na tele o numero fixo sera o topo
    });
  }

  // verifica a distancia de cada objeto em relacao ao scroll do site
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add("ativo");
      } else if (item.element.classList.contains("ativo")) {
        item.element.classList.remove("ativo");
      }
    });
  }

  init() {
    // se existi secoes para ser animadas eu ativo isso
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance(); // ele já vai iniciar com a animacao

      window.addEventListener("scroll", this.checkDistance);
      // o this dentro do callback tem que fazer referencia ao window por isso o (bind)
    }
    return this;
  }

  // removo o event de scroll
  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}
