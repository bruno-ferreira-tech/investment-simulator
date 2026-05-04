import { Body, Controller, Post } from "@nestjs/common";
import { SimulationService } from "./simulation.service";
import { CreateSimulationDto } from "./dto/create-simulation.dto";
import { CreateReverseSimulationDto } from "./dto/create-simulation-aporte.dto";

@Controller("simulations")
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Post()
  createSimulation(@Body() dto: CreateSimulationDto) {
    return this.simulationService.newSimulation(dto);
  }

  @Post()
  createSimulationAporte(@Body() dto: CreateReverseSimulationDto){
    return this.simulationService.newReverseSimulation(dto)
  }
}
