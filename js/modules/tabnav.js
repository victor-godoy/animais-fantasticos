export default class TabNav {
  constructor(menu, content) {
    this.tabMenu = document.querySelectorAll(menu);
    this.tabContent = document.querySelectorAll(content);

    this.activeClass = "ativo"; // se repete muito por isso coloquei aqui
  }

  // ativa a tab de acordo com o index da mesma
  activeTab(index) {
    this.tabContent.forEach((section) => {
      section.classList.remove(this.activeClass);
    });

    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add(this.activeClass, direcao);
  }

  addTabnavEvent() {
    this.tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener("click", () => {
        this.activeTab(index);
      });
    });
  }

  init() {
    // vou verificar se possue item no menu e se tem conteudo
    if (this.tabMenu.length && this.tabContent.length) {
      this.activeTab(0); // ativando o primeiro item
      this.addTabnavEvent(); // para os eventos acontecerem
    }
    return this;
  }
}
