import { Injectable } from "@nestjs/common";
import { CreateSimulationDto } from "./dto/create-simulation.dto";
import { Simulation } from "../../domain/entities/Simulation";
import { MonetaryAmount } from "../../domain/value-objects/MonetaryAmount";
import { InterestRate } from "../../domain/value-objects/InterestRate";
import { InvestmentPeriod } from "../../domain/value-objects/InvestmentPeriod";
import { RegressiveTaxStrategy } from "../../domain/tax-strategies/RegressiveTaxStrategy";
import { ExemptTaxStrategy } from "../../domain/tax-strategies/ExemptTaxStrategy";

@Injectable()
export class SimulationService {
  constructor() {}

  async newSimulation(data: CreateSimulationDto) {
    const estrategia =
      data.tipoInvestimento === "CDB"
        ? new RegressiveTaxStrategy()
        : new ExemptTaxStrategy();

    const aporteInicial = new MonetaryAmount(data.aporteInicial);
    const aporteMensal = new MonetaryAmount(data.aporteMensal);
    const taxaAnual = new InterestRate(data.taxaAnual);
    const tempoInvestimento = new InvestmentPeriod(data.tempoInvestimento);
    const reajusteAnual = new InterestRate(data.reajusteAnual);

    const simulation = new Simulation(
      aporteInicial,
      aporteMensal,
      taxaAnual,
      tempoInvestimento,
      reajusteAnual,
      estrategia
    );

    return {
      montanteFinal: simulation.getMontanteFinal(),
      montanteLiquido: simulation.getMontanteLiquido(),
    };
  }
}
