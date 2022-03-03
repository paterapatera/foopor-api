import { Account } from './Account'
import { Email } from './Email'

export abstract class AccountRepository {
  abstract insert(account: Account): Promise<void>
  abstract findByActiveEmail(email: Email): Promise<Account | undefined>
}
