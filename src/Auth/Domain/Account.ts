import { Entity, ValueObject } from 'src/_Common'
import { Email } from './Email'
import { Nickname } from './Nickname'
import { Password } from './Password'

export class AccountId extends ValueObject {
  constructor(public readonly value: string) {
    super()
  }
}

export class Account extends Entity {
  constructor(
    public readonly id: AccountId,
    public email: Email,
    public password: Password,
    public nickname: Nickname,
  ) {
    super()
  }
}
