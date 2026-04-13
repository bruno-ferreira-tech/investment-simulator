import { ExemptTaxStrategy } from "./ExemptTaxStrategy"
import { ITaxStrategy } from "./ITaxStrategy"
import { RegressiveTaxStrategy } from "./RegressiveTaxStrategy"


export class TaxStrategyFactory {
  static create(tipo: string): ITaxStrategy {
    const strategies: Record<string, ITaxStrategy> = {
      'CDB': new RegressiveTaxStrategy(),
      'LCI': new ExemptTaxStrategy(),
      'LCA': new ExemptTaxStrategy(),
    }

    const strategy = strategies[tipo]
    if (!strategy) throw new Error(`Tipo de investimento inválido: ${tipo}`)
    return strategy
  }
}