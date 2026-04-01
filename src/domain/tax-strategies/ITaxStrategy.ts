export interface ITaxStrategy {
    calculate(montante: number, TotalInvestido: number, meses: number): number
}