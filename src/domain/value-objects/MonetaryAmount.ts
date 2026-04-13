export class MonetaryAmount {
  private readonly value: number;

  constructor(value: number, allowZero: boolean = false) {
    if (value < 0) {
      throw new Error("Valor inválido: não pode ser negativo");
    }

    if (!allowZero && value < 0.01) {
      throw new Error("Valor inválido: mínimo é R$ 0,01");
    }

    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}
