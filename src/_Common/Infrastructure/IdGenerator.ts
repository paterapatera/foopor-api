import * as dayjs from 'dayjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class IdGenerator {
  /**
   * 18桁のIDを生成
   *
   * 例）GJXVDF19S9GSF1979G
   */
  id(): string {
    const strong = 7

    const hex = 36
    const timeHex = BigInt(dayjs().format('YYYYMMDDHHmmssSSS')).toString(hex)
    const randHex = Math.floor(Math.random() * hex ** strong)
      .toString(hex)
      .padStart(strong, '0')

    return (timeHex + randHex).toUpperCase()
  }
}
