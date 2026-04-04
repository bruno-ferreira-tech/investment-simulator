import axios from 'axios'

export async function fetchCdiRate(): Promise<number> {
  const response = await axios.get(
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/1?formato=json'
  )

  return parseFloat(response.data[0].valor)
}