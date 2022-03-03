import { Injectable } from '@nestjs/common'
import { AccountRepository } from 'src/Auth/Domain/AccountRepository'
import { Account, AccountId } from 'src/Auth/Domain/Account'
import { PrismaService } from 'src/_Common'
import { Email } from 'src/Auth/Domain/Email'
import { Account as AccountP } from '@prisma/client'
import { Password } from 'src/Auth/Domain/Password'
import { Nickname } from 'src/Auth/Domain/Nickname'

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}

  async insert(account: Account): Promise<void> {
    await this.prisma.account.create({
      data: {
        id: account.id.value,
        email: account.email.value,
        password: account.password.value,
        nickname: account.nickname.value,
        active: true,
      },
    })
  }

  async findByActiveEmail(email: Email): Promise<Account | undefined> {
    const account = await this.prisma.account.findFirst({ where: { email: email.value, active: true } })
    return account ? this.toDomain(account) : undefined
  }

  toDomain(account: AccountP): Account {
    return new Account(
      new AccountId(account.id),
      new Email(account.email),
      new Password(account.password),
      new Nickname(account.nickname),
    )
  }
}
