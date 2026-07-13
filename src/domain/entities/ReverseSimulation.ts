import { ITaxStrategy } from "../tax-strategies/ITaxStrategy";
import { InterestRate } from "../value-objects/InterestRate";
import { InvestmentPeriod } from "../value-objects/InvestmentPeriod";
import { MonetaryAmount } from "../value-objects/MonetaryAmount";
import { Simulation } from "./Simulation";

export class ReverseSimulation {

  constructor(
    private readonly aporteInicial: MonetaryAmount,
    private readonly taxAnual: InterestRate,
    private readonly investmentPeriod: InvestmentPeriod,
    private readonly reajusteAnual: InterestRate,
    private readonly inflacao: InterestRate,
    private readonly tributationStrategy: ITaxStrategy,
    private readonly amountAmbicious: MonetaryAmount,
  ) {}

  calcularAporte() {

    let valueMin = 0;
    let valueMax = this.amountAmbicious.getValue() * 0.1;
    let valueMed = new MonetaryAmount((valueMin + valueMax) / 2, true);
    let difference = 0;

    do {
      const simulation = new Simulation(
        this.aporteInicial,
        valueMed,
        this.taxAnual,
        this.investmentPeriod,
        this.reajusteAnual,
        this.inflacao,
        this.tributationStrategy,
      );

      if (simulation.getMontanteFinal() < this.amountAmbicious.getValue()) {
        valueMin = valueMed.getValue();
      } else {
        valueMax = valueMed.getValue();
      }

      valueMed = new MonetaryAmount((valueMax + valueMin) / 2);

      difference = simulation.getMontanteFinal() - this.amountAmbicious.getValue();
    } while (Math.abs(difference) > 0.01);

    return valueMed.getValue();
  }
}
