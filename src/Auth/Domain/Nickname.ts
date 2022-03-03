import { ValueObject } from 'src/_Common'

export class Nickname extends ValueObject {
  constructor(public readonly value: string) {
    super()
  }
}
