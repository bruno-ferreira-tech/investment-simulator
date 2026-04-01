import { ITaxStrategy } from "./ITaxStrategy"

export class ExemptTaxStrategy implements ITaxStrategy {
  calculate(_montante: number, _totalInvestido: number, _meses: number): number {
    return 0
  }
}