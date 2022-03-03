import { ValueObject } from 'src/_Common'

export class PasswordInvalid extends Error {
  constructor() {
    super('パスワードが不正です')
    this.name = this.constructor.name
  }
}

export class Password extends ValueObject {
  static readonly PASSWORD_MIN_LENGTH = 6

  constructor(public readonly value: string) {
    super()
    if (value.length < Password.PASSWORD_MIN_LENGTH) throw new PasswordInvalid()
  }
}
