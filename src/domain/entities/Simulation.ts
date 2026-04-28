import { ITaxStrategy } from "../tax-strategies/ITaxStrategy";
import { InterestRate } from "../value-objects/InterestRate";
import { InvestmentPeriod } from "../value-objects/InvestmentPeriod";
import { MonetaryAmount } from "../value-objects/MonetaryAmount";

export class Simulation {
  private readonly montanteFinal: number;
  private readonly montanteLiquido: number;
  private readonly valorPresenteFinal: number;
  private readonly valorPresenteFinalLiquido: number;

  constructor(
    aporteInicial: MonetaryAmount,
    aporteMensal: MonetaryAmount,
    taxaAnual: InterestRate,
    tempoInvestimento: InvestmentPeriod,
    reajusteAnual: InterestRate,
    inflacao: InterestRate,
    private readonly estrategia: ITaxStrategy,
  ) {
    const taxaMensal = Math.pow(1 + taxaAnual.getValue(), 1 / 12) - 1;
    const totalMeses = tempoInvestimento.getValue() * 12;
    let aporteMensalAtual = aporteMensal.getValue();
    let montante = aporteInicial.getValue();
    let totalInvestido = aporteInicial.getValue();

    for (let i = 1; i <= totalMeses; i++) {
      montante = (montante + aporteMensalAtual) * (1 + taxaMensal);
      totalInvestido += aporteMensalAtual;

      if (i > 0 && i % 12 === 0) {
        aporteMensalAtual *= 1 + reajusteAnual.getValue();
      }
    }

    const imposto = this.estrategia.calculate(
      montante,
      totalInvestido,
      totalMeses,
    );

    this.valorPresenteFinal =
      montante /
      Math.pow(1 + inflacao.getValue(), tempoInvestimento.getValue());
    this.valorPresenteFinalLiquido =
      (montante - imposto) /
      Math.pow(1 + inflacao.getValue(), tempoInvestimento.getValue());
    this.montanteFinal = montante;
    this.montanteLiquido = montante - imposto;
  }

  getMontanteFinal(): number {
    return this.montanteFinal;
  }

  getMontanteLiquido(): number {
    return this.montanteLiquido;
  }

  getMontantePresenteFinal(): number {
    return this.valorPresenteFinal;
  }

  getMontantePresenteLiquido(): number {
    return this.valorPresenteFinalLiquido;
  }
}
