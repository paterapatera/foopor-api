import { Injectable } from '@nestjs/common'
import { Spec } from 'src/_Common/Domain/Spec'
import { Account } from 'src/Auth/Domain/Account'
import { AccountRepository } from 'src/Auth/Domain/AccountRepository'

@Injectable()
export class ExistsActiveEmailInRepository extends Spec<{ account: Account }> {
  constructor(private repository: AccountRepository) {
    super()
  }
  async validate(candidate: { account: Account }): Promise<boolean> {
    const account = await this.repository.findByActiveEmail(candidate.account.email)
    return !!account
  }
}
