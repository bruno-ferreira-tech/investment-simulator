import { Injectable } from "@nestjs/common";
import { CreateSimulationDto } from "./dto/create-simulation.dto";
import { Simulation } from "../../domain/entities/Simulation";
import { MonetaryAmount } from "../../domain/value-objects/MonetaryAmount";
import { InterestRate } from "../../domain/value-objects/InterestRate";
import { InvestmentPeriod } from "../../domain/value-objects/InvestmentPeriod";
import { RegressiveTaxStrategy } from "../../domain/tax-strategies/RegressiveTaxStrategy";
import { getCdiRate } from "../../infra/cache/cdi.cache.service";
import { TaxStrategyFactory } from "../../domain/tax-strategies/TaxStrategyFactory";
import { ExemptTaxStrategy } from "../../domain/tax-strategies/ExemptTaxStrategy";
import { CreateReverseSimulationDto } from "./dto/create-simulation-aporte.dto";

@Injectable()
export class SimulationService {
  async newSimulation(data: CreateSimulationDto) {
    const estrategia = TaxStrategyFactory.create(data.tipoInvestimento);

    const aporteInicial = new MonetaryAmount(data.aporteInicial);
    const aporteMensal = new MonetaryAmount(data.aporteMensal, true);
    const taxaAnual = new InterestRate(data.taxaAnual);
    const tempoInvestimento = new InvestmentPeriod(data.tempoInvestimento);
    const reajusteAnual = new InterestRate(data.reajusteAnual);
    const inflacao = new InterestRate(data.inflacao);

    const simulation = new Simulation(
      aporteInicial,
      aporteMensal,
      taxaAnual,
      tempoInvestimento,
      reajusteAnual,
      inflacao,
      estrategia,
    );

    // Comparativo com CDI
    const cdiTaxa = await getCdiRate();
    const cdiSimulation = new Simulation(
      aporteInicial,
      aporteMensal,
      new InterestRate(cdiTaxa),
      tempoInvestimento,
      reajusteAnual,
      inflacao,
      new ExemptTaxStrategy(),
    );

    return {
      montanteFinal: simulation.getMontanteFinal(),
      montanteLiquido: simulation.getMontanteLiquido(),
      montantePresenteFinal: simulation.getMontantePresenteFinal(),
      montantePresenteLiquido: simulation.getMontantePresenteLiquido(),
      comparativoCDI: {
        taxa: cdiTaxa,
        montanteFinal: cdiSimulation.getMontanteFinal(),
        montanteLiquido: cdiSimulation.getMontanteLiquido(),
        montantePresenteFinal: cdiSimulation.getMontantePresenteFinal(),
        montantePresenteLiquido: cdiSimulation.getMontantePresenteLiquido(),
      },
    };
  }

  async newReverseSimulation(data: CreateReverseSimulationDto) {
    const estrategia = TaxStrategyFactory.create(data.tipoInvestimento);

    const aporteInicial = new MonetaryAmount(data.aporteInicial);
    const taxaAnual = new InterestRate(data.taxaAnual);
    const tempoInvestimento = new InvestmentPeriod(data.tempoInvestimento);
    const reajusteAnual = new InterestRate(data.reajusteAnual);
    const inflacao = new InterestRate(data.inflacao);
    const amountAmbicious = new MonetaryAmount(data.amountAmbicious);
  }
}
