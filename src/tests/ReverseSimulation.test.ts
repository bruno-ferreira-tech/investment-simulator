import { ReverseSimulation } from "../domain/entities/ReverseSimulation";
import { MonetaryAmount } from "../domain/value-objects/MonetaryAmount";
import { InterestRate } from "../domain/value-objects/InterestRate";
import { InvestmentPeriod } from "../domain/value-objects/InvestmentPeriod";
import { ExemptTaxStrategy } from "../domain/tax-strategies/ExemptTaxStrategy";

describe("ReverseSimulation", () => {
  it("deve calcular o aporte mensal para atingir a meta", () => {
    // ARRANGE
    const aporteInicial = new MonetaryAmount(10000);
    const taxAnual = new InterestRate(10);
    const investmentPeriod = new InvestmentPeriod(5);
    const reajusteAnual = new InterestRate(5);
    const estrategia = new ExemptTaxStrategy();
    const inflacao = new InterestRate(5);
    const amountAmbicious = new MonetaryAmount(50000);

    // ACT
    const reverseSimulation = new ReverseSimulation(
      aporteInicial,
      taxAnual,
      investmentPeriod,
      reajusteAnual,
      inflacao,
      estrategia,
      amountAmbicious,
    );
    const aporte = reverseSimulation.calcularAporte();

    // ASSERT
    expect(aporte).toBeCloseTo(401.14, 0);
  });

  it("deve retornar aporte zero quando a meta já é atingida só com o inicial", () => {
    const reverseSimulation = new ReverseSimulation(
      new MonetaryAmount(10000),
      new InterestRate(10),
      new InvestmentPeriod(1),
      new InterestRate(0),
      new InterestRate(5),
      new ExemptTaxStrategy(),
      new MonetaryAmount(5000),
    );

    expect(reverseSimulation.calcularAporte()).toBe(0);
  });
});
