export default class Funcionamento {
  constructor(funcionamento, activeclass) {
    this.funcionamento = document.querySelector(funcionamento);
    this.activeClass = activeclass;
  }

  // puxa todos os dados de funcionamento
  // baseados no (this.funcionamento)
  dadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(",").map(Number);
    this.horarioSemana = this.funcionamento.dataset.horario
      .split(",")
      .map(Number);
  }

  // pega os dados de agora, dia de hoje...
  dadosAgora() {
    this.dataAgora = new Date();
    this.diaAgora = this.dataAgora.getDay();
    this.horarioAgora = this.dataAgora.getUTCHours() - 3;
    // ao inves de ser (getHours) tem que ser(getUTCHours) pois a pessoa pode ver meu site em
    // outro lugar do pais. O tempo do Brasil em relaçao ao tempo UTC é ( -3 )
  }

  // verifica se esta aberto
  estaAberto() {
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;
    const horarioAberto =
      this.horarioAgora >= this.horarioSemana[0] &&
      this.horarioAgora < this.horarioSemana[1];

    return semanaAberto && horarioAberto; // vou retornar o resultados deles (pode retornar true or false )
  }

  // caso esteja aberto
  ativaAberto() {
    if (this.estaAberto()) {
      this.funcionamento.classList.add(this.activeClass);
    }
  }

  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAgora();
      this.ativaAberto();
    }
    return this;
  }
}
