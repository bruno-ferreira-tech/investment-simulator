export class InvestmentPeriod {
  private readonly prazo: number;

  // O prazo vamos receber em anos
  constructor(value: number) {
    if (value < 0) {
      throw new Error("O valor não pode ser menor que zero!");
    }

    if (value === 0) {
      throw new Error("O valor não pode ser zero");
    }

    this.prazo = value;
  }

  getValue(): number {
    return this.prazo;
  }
}
