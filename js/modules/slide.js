import debounce from "./debounce.js";

export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

    this.dist = { finalPosition: 0, startX: 0, movement: 0 };

    this.activeClass = "active";

    this.changeEvent = new Event("changeEvent"); // estou criando um novo evento baseado no (changeEvent) que tera o mesmo nome
  }

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  // para mexer com o valor que queremos (dar movimento ao slide com o mouse)
  moveSlide(distX) {
    this.dist.moveposition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)  `;
  }

  // vai pegar a posicao que o usuario clicou
  // e o movimento que ele esta fazendo ccom o mouse
  updatePosition(clientX) {
    // pega o valor do clique e a moimentacao que eu faco com o mouse
    // estou multiplicando para a movimentacao ir mais rapido
    this.dist.movement = (this.dist.startX - clientX) * 1.6;

    // para puxar na direcao do mouse (antes estava puxndo ao contrario )
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    // verificando se o tipo do evento for 'mousemove' é para manter o padrao
    // se for de outro tipo no caso ' touchmove '

    let movetype;

    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX; // referencia do clique inicial do usuario
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX; // referencia do clique inicial do usuario
      movetype = "touchmove";
    }

    // this.dist.startX = event.clientX; // referencia do clique inicial do usuario
    this.wrapper.addEventListener(movetype, this.onMove);
    this.transition(false);
  }

  // evento de quando mover o mouse.
  // sera ativado só quando clicar por isso vou colocar
  // no (onStart). Quero que depois que eu desclique ele remova o evento
  // por isso o (onEnd)
  onMove(event) {
    // posicao inicial pode ser um dedo ou mouse
    // se for igual a 'mousemove ' event.clientX
    // se nao for igual a mousemove vai ser 'touchemove' = event.changedTouches[0].clientX;
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;

    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";

    this.wrapper.removeEventListener(movetype, this.onMove);
    // quando tirar o mouse de cima ele tem que salvar a posicao que foi deixado o slide
    // quando clicar novamente ele fique na posicao que havia sido deixada
    this.dist.finalPosition = this.dist.moveposition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  // mude o slide ao final ( quando terminar o movimento  )
  // quando o valor do movimento que eu fiz for + vai para o proximo
  // quando - vai para o anterior

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  // adicionar os eventos
  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);

    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  // slides config
  // vamos colocar as imgs no centro
  // para calcular vamos pegar o total da tela menos o elemento vai sobrar as laterais
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    // 1 transformar cada slide em uma array ( desestruturar para pegar cada filho ou item)
    // quero retornar um ( objeto então uso o map )
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  // para onde acaba
  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;

    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  // mudanca de slide
  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass();

    // funcao que vai emitir esse evento que criamos novo (  this.changeEvent = new Event("changeEvent") )
    // la em ( eventControl ) vou escutar esse evento ou seja vou ficar observando ele
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  // classes ativas
  changeActiveClass() {
    this.slideArray.forEach((item) =>
      item.element.classList.remove(this.activeClass)
    );
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  activePrevSlide() {
    // só vai ativar se for diferente de undefined
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    // só vai ativar se for diferente de undefined
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  // caso o resize aconteca quero que o (this.lidesConfig()) ocorra novamente
  onResize() {
    // espera ele dar o resize total depois ativa ela
    setTimeout(() => {
      this.slidesConfig(); // cong da onde esta o nosso elemento
      this.changeSlide(this.index.active);
    }, 1000);
  }

  addResideEvent() {
    window.addEventListener("resize", this.onResize);
  }

  // relacionar o this do meu callback ao objeto ( Slide )
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);

    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  init() {
    this.bindEvents();
    this.transition(true);

    this.addSlideEvents();
    this.slidesConfig();

    this.addResideEvent();

    this.changeSlide(0); // index de qual eu quero ativar primeiro
    return this;
  }
}

// classe SlideNav
export default class SlideNav extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper); // para puxar os argumentos do construtor de (Slide)
    this.bindControlsEvents();
  }

  // navegacao para frente e para tras
  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowEvent(); // ativar a funcao
  }

  // eventos dos buttons
  addArrowEvent() {
    this.prevElement.addEventListener("click", this.activePrevSlide);
    this.nextElement.addEventListener("click", this.activeNextSlide);
  }

  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide"; // colocando o (data)

    // em cada foreach ele vai adicionar um desse control
    this.slideArray.forEach((item, index) => {
      // o (index + 1) é só para com 0
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });

    this.wrapper.appendChild(control); // ele adiciona a navegacao interna para os slides

    return control;
  }

  eventControl(item, index) {
    // vai mudar de acordo com o index que eu clicar
    // cada index do botao se relaciona com cada slide
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });

    // to observando o evento que criei (changeEvent)
    // entao toda vez que eu mudar de slide ele vai ser ativado (changeEvent) e vou passar a
    // funcao que quero ativar no caso (this.activeControlItem  )

    this.wrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  // quando eu clicar nas bolinhas de navegacao tem que mostrar
  activeControlItem() {
    this.controlArray.forEach((item) =>
      item.classList.remove(this.activeClass)
    );
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();

    this.controlArray = [...this.control.children]; // desestruturando as li e transformando em uma array

    this.activeControlItem();

    this.controlArray.forEach(this.eventControl); // como os argumentos sao iguais nao precisa definir
  }

  bindControlsEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
