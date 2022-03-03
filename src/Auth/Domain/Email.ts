import { ValueObject } from 'src/_Common'

export class EmailInvalid extends Error {
  constructor() {
    super('パスワードが不正です')
    this.name = this.constructor.name
  }
}

export class Email extends ValueObject {
  static readonly EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

  constructor(public readonly value: string) {
    super()
    if (!Email.EMAIL_REGEX.test(value)) throw new EmailInvalid()
  }
}
