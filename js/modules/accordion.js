export default class Accordion {
  constructor(list) {
    this.accordionList = document.querySelectorAll(list);
    /* const accordionList = document.querySelectorAll(
      '[data-anime="accordion"] dt'
    );*/
    this.activeClass = "ativo";
  }

  toggleAccordion(item) {
    // estou passando esse parametro (item) pois quero que seja referencia ao meu item mesmo por isso nao usei o this
    // item nesse caso é o meu ( dt ativo )
    item.classList.toggle(this.activeClass);
    item.nextElementSibling.classList.toggle(this.activeClass);
  }

  // adiciona os eventos ao accordion
  addAccordionListener() {
    this.accordionList.forEach((item) => {
      item.addEventListener("click", () => this.toggleAccordion(item));
    });
  }

  init() {
    if (this.accordionList.length) {
      this.toggleAccordion(this.accordionList[0]); // para ativar o primeiro item do accordion
      this.addAccordionListener();
    }
    return this;
  }
}
