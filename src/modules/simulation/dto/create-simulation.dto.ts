import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from "class-validator";

export class CreateSimulationDto {
  @IsNotEmpty({ message: 'O campo "aporteInicial" é obrigatório.' })
  @IsNumber({}, { message: 'O campo "aporteInicial" deve ser um número.' })
  @IsPositive({
    message: 'O campo "aporteInicial" deve ser um número positivo.',
  })
  aporteInicial!: number;

  @IsNotEmpty({ message: 'O campo "aporteMensal" é obrigatório.' })
  @IsNumber({}, { message: 'O campo "aporteMensal" deve ser um número.' })
  @Min(0, { message: 'O campo "aporteMensal" não pode ser negativo.'})
  aporteMensal!: number;

  @IsNotEmpty({ message: 'O campo "taxaAnual" é obrigatório.' })
  @IsNumber({}, { message: 'O campo "taxaAnual" deve ser um número.' })
  @IsPositive({ message: 'O campo "taxaAnual" deve ser um número positivo.' })
  @Max(100, { message: 'O campo "taxaAnual" deve ser menor ou igual a 100.' })
  taxaAnual!: number;

  @IsNotEmpty({ message: 'O campo "tempoInvestimento" é obrigatório.' })
  @IsNumber({}, { message: 'O campo "tempoInvestimento" deve ser um número.' })
  @IsPositive({
    message: 'O campo "tempoInvestimento" deve ser um número positivo.',
  })
  tempoInvestimento!: number;

  @IsNotEmpty({ message: 'O campo "reajusteAnual" é obrigatório.' })
  @IsNumber({}, { message: 'O campo "reajusteAnual" deve ser um número.' })
  @Min(0, { message: 'O campo "reajusteAnual" deve ser maior ou igual a 0.' })
  @Max(100, {
    message: 'O campo "reajusteAnual" deve ser menor ou igual a 100.',
  })
  reajusteAnual!: number;

  @IsNotEmpty({ message: "O tipo de investimento é obrigatório." })
  @IsEnum(["CDB", "LCI", "LCA"], {
    message: "O tipo deve ser CDB, LCI ou LCA.",
  })
  tipoInvestimento!: string;
}
