import { Module } from '@nestjs/common'
import { SimulationModule } from './modules/simulation/simulation.module';

@Module({
    imports: [SimulationModule],
})
export class AppModule {}