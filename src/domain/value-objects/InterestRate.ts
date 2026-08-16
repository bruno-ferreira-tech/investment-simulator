export class InterestRate {
  private readonly value: number;

  //Recebe a taxa em percentual (ex: 12 para 12%) e armazena como decimal (ex: 0.12)
  constructor(taxa: number) {
    if (taxa < 0) {
      throw new Error("Taxa não pode ser negativa");
    }

    if (taxa > 100) {
      throw new Error("Valor não pode ser maior que 100");
    }

    this.value = taxa / 100;
  }

  getValue() {
    return this.value;
  }
}
