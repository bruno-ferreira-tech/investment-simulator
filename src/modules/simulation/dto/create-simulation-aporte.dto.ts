import { OmitType } from "@nestjs/mapped-types";
import { CreateSimulationDto } from "./create-simulation.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReverseSimulationDto extends OmitType(CreateSimulationDto, [
  "aporteMensal",
] as const) {
  @IsNumber()
  @IsNotEmpty()
  amountAmbicious!: number;
}
