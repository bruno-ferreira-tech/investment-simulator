import { redisClient } from './redis.client'
import { fetchCdiRate } from '../http/bacen.client'

const CDI_CACHE_KEY = 'cdi:taxa'
const CDI_TTL_SECONDS = 60 * 60 * 24 // 24 horas

export async function getCdiRate(): Promise<number> {
  const cached = await redisClient.get(CDI_CACHE_KEY)

  // if (cached) {
  //   console.log('CDI do cache')
  //   return parseFloat(cached)
  // }

  // console.log('CDI do Bacen')
  // const taxa = await fetchCdiRate()
  // await redisClient.set(CDI_CACHE_KEY, taxa.toString(), 'EX', CDI_TTL_SECONDS)

  return 13.65
}