import { InterestRate } from "../value-objects/InterestRate"
import { InvestmentPeriod } from "../value-objects/InvestmentPeriod"
import { MonetaryAmount } from "../value-objects/MonetaryAmount"

export class Simulation {

    private readonly montanteFinal: number

    constructor(
        aporteInicial: MonetaryAmount,
        aporteMensal: MonetaryAmount,
        taxaAnual: InterestRate,
        tempoInvestimento: InvestmentPeriod,
        reajusteAnual: InterestRate
    ) {

        const taxaMensal = Math.pow(1 + taxaAnual.getValue(), 1 / 12) - 1
        const totalMeses = tempoInvestimento.getValue() * 12
        let aporteMensalAtual = aporteMensal.getValue()
        let montante = aporteInicial.getValue()

        for (let i = 1; i <= totalMeses; i++) {
            montante = (montante + aporteMensalAtual) * (1 + taxaMensal)

            if (i > 0 && i % 12 === 0) {
                aporteMensalAtual *= (1 + reajusteAnual.getValue())
            }
        }

        this.montanteFinal = montante
    }
    getMontanteFinal(): number {
        return this.montanteFinal;
    }

}