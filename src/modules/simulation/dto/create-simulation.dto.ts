import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator'

export class CreateSimulationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  aporteInicial!: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  aporteMensal!: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(100)
  taxaAnual!: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  tempoInvestimento!: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  reajusteAnual!: number
}