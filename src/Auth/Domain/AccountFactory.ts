import { Injectable } from '@nestjs/common'
import { IdGenerator } from 'src/_Common'
import { Account, AccountId } from './Account'
import { Email } from './Email'
import { Nickname } from './Nickname'
import { Password } from './Password'
import { ExistsActiveEmailInRepository } from './Spec'

export class AccountSpecError extends Error {
  constructor(info: string) {
    super('アカウント作成の仕様を満たしていません:' + info)
    this.name = this.constructor.name
  }
}

export type AccountField = { email: Email; password: Password; nickname: Nickname }

@Injectable()
export class AccountFactory {
  constructor(private idGenerator: IdGenerator, private existsActiveEmailInRepository: ExistsActiveEmailInRepository) {}
  async create(field: AccountField): Promise<Account> {
    const account = new Account(new AccountId(this.idGenerator.id()), field.email, field.password, field.nickname)

    if (await this.existsActiveEmailInRepository.isSatisfiedBy({ account })) {
      throw new AccountSpecError(this.existsActiveEmailInRepository.getJsonReports())
    }
    return account
  }
}
