import { ITaxStrategy } from "./ITaxStrategy";


export class RegressiveTaxStrategy implements ITaxStrategy{

    calculate(montante: number, totalInvestido: number, meses: number): number {
        const lucro = montante - totalInvestido

        const diasMeses = meses * 30

        if (diasMeses <= 180){
            return lucro * 0.225
        }else if(diasMeses <= 360){
            return lucro * 0.2
        }else if(diasMeses <= 720){
            return lucro * 0.175
        }else{
            return lucro * 0.15
        }
    }

}