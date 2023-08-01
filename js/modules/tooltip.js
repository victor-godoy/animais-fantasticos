export default class Tooltip {
  constructor(tooltips, onMouseMove) {
    this.tooltips = document.querySelectorAll(tooltips);

    // bindo do objeto da classe aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // move a tooltip com base em seus estilos
  // de acordo com a posicao do mouse
  onMouseMove(event) {
    // quando vou mexendo o mouse ele vai acompanhando
    this.tooltipBox.style.top = `${event.pageY + 20}px`;

    // vou verificar se a minha tooltip passa do mapa no eixo x ( onde estou no x + 240 )
    // ou seja se miha tooltip for maior do que o tamanho da pagina total no eixo x
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  // remove a tooltip e os eventos de MouseMove e MouseLeave ou seja se o mouse sair dela
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  // cria a tooltip box e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);

    this.tooltipBox = tooltipBox; // vou criar um parametro dentro de um obj de uma classe w
  }

  // cria a tooltip e adiciona os eventos de MouseMove e MouseLeave
  onMouseOver({ currentTarget }) {
    this.criarTooltipBox(currentTarget); // ele vai criar a tootip baseada no mapa e ( coloca em uma propriedade )

    // acionando o evento ao (event.currentTarget)
    currentTarget.addEventListener("mousemove", this.onMouseMove);
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }

  // adiciona os eventos de MouseOver a cada tooltip
  addTootipEvents() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTootipEvents();
    }
    return this;
  }
}
