import outsideClick from "./outsideclick.js";

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);

    // define touchstart e click como argumento padrao
    // de events caso o usuario nao defina
    if (this.events === undefined) {
      this.events = ["touchstart", "click"];
    } else {
      this.events = events;
    }

    this.activeClass = "active";
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  // ativa o dropdownMenu e adiciona o clique fora dele
  activeDropdownMenu(event) {
    event.preventDefault();

    const element = event.currentTarget;

    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      // estamos usando o this aqui, mas se vermos o outsideClick lá verificamos se estou
      // clicando dentro do elemento ou fora dele
      // e meu elemento não é this( faz referencia ao objeto)
      // então temos que mudar isso para ( event.currentTarget ) e vou passar ele em uma constante

      element.classList.remove(this.activeClass);
    });
  }

  // adiciona os eventos ao dropdownMenu
  addEventListener() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addEventListener();
    }

    return this;
  }
}
