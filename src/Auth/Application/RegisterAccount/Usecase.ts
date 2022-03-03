import { Injectable } from '@nestjs/common'
import { Account } from 'src/Auth/Domain/Account'
import { AccountFactory } from 'src/Auth/Domain/AccountFactory'
import { AccountRepository } from 'src/Auth/Domain/AccountRepository'
import { Email } from 'src/Auth/Domain/Email'
import { Nickname } from 'src/Auth/Domain/Nickname'
import { Password } from 'src/Auth/Domain/Password'
import { RegisterAccountInputData, RegisterAccountInputPort, RegisterAccountOutputPort } from './IO'

@Injectable()
export class RegisterAccountUsecase implements RegisterAccountInputPort {
  constructor(
    private outputPort: RegisterAccountOutputPort,
    private accountFactory: AccountFactory,
    private accountRepository: AccountRepository,
  ) {}
  async execute(inputData: RegisterAccountInputData): Promise<void> {
    let account: Account
    try {
      const email = new Email(inputData.email)
      const password = new Password(inputData.password)
      const nickname = new Nickname(inputData.nickname)
      account = await this.accountFactory.create({ email, password, nickname })
    } catch (e) {
      return this.outputPort.badRequest(e)
    }

    try {
      await this.accountRepository.insert(account)
      return this.outputPort.success({ result: 'Success' })
    } catch (e) {
      return this.outputPort.internalServerError(e)
    }
  }
}
