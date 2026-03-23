import { Simulation } from "../domain/entities/Simulation"
import { MonetaryAmount } from "../domain/value-objects/MonetaryAmount"
import { InterestRate } from "../domain/value-objects/InterestRate"
import { InvestmentPeriod } from "../domain/value-objects/InvestmentPeriod"

describe("Simulation", () => {

  it("deve calcular o montante final corretamente", () => {
    // ARRANGE
    const aporteInicial = new MonetaryAmount(1000)
    const aporteMensal = new MonetaryAmount(500)
    const taxaAnual = new InterestRate(12)
    const periodo = new InvestmentPeriod(1)
    const reajusteAnual = new InterestRate(0)

    // ACT
    const simulation = new Simulation(
      aporteInicial,
      aporteMensal,
      taxaAnual,
      periodo,
      reajusteAnual
    )

    // ASSERT
    expect(simulation.getMontanteFinal()).toBeCloseTo(7503.25, 1)
  })

  it("deve rejeitar aporte inicial negativo", () => {
    expect(() => new MonetaryAmount(-1000))
      .toThrow("Valor inválido: não pode ser negativo")
  })

  it("deve rejeitar taxa negativa", () => {
    expect(() => new InterestRate(-5))
      .toThrow("Taxa não pode ser negativa")
  })

})