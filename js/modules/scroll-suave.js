export default class ScrollSuave {
  constructor(links, options) {
    // vamos passsar os argumentos que o usuário vai passar
    this.linksInternos = document.querySelectorAll(links);

    if (options === undefined) {
      this.options = {
        behavior: "smooth",
        block: "start",
      };
    } else {
      this.options = options;
    }

    this.scrollToSection = this.scrollToSection.bind(this); // com o bind conseguimos definir qual vai ser o this dessa funcao. Entao independente da onde usarmos essa funcao ela vai ser o this que passarmos no bind
  }

  scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);

    section.scrollIntoView(this.options); // estamos tirando os padroes que tinha colocado no scroll, pois o usuario pode colocar o que ele quiser
  }

  addLinkEvents() {
    this.linksInternos.forEach((link) => {
      link.addEventListener("click", this.scrollToSection);
    });
    /*link.addEventListener("click", (event) => {
        this.scrollToSection(event);
      });*/
    // o this antes estava selecionando o link e nos queremos selecionar o que esta antes do link por isso usamos a arrow function - O ruim é se quisermos remover em algum momento o addEventListener nao conseguimos mais pois ela é uma funcao anonima e temos que ter a funcao exata para poder remover ela ( Por isso não vamos passar assim   )
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvents();
      // ou seja se tiver alguma coisa o link ai sim vai ativar o metodo addEventListener
    }
    return this; // se nao passsarmos o this o metodo init vai retornar undefined
  }
}
