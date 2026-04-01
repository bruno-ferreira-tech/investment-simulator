export class MonetaryAmount {
  private readonly value: number

  constructor(value: number) {
    if (value < 0) {
      throw new Error("Valor inválido: não pode ser negativo")
    }

    this.value = value
  }

  getValue(): number {
    return this.value
  }
}