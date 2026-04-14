import { Module } from "@nestjs/common";
import { SimulationModule } from "./modules/simulation/simulation.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}), SimulationModule],
})
export class AppModule {}