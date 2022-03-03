import { Module } from '@nestjs/common'
import { RegisterAccountController, RegisterAccountPresenter } from 'src/Auth/Presentation/RegisterAccount/Controller'
import { RegisterAccountInputPort, RegisterAccountOutputPort } from 'src/Auth/Application/RegisterAccount/IO'
import { RegisterAccountUsecase } from 'src/Auth/Application/RegisterAccount/Usecase'
import { AccountFactory } from 'src/Auth/Domain/AccountFactory'
import { AccountRepository } from 'src/Auth/Domain/AccountRepository'
import { IdGenerator, PrismaService, Logger, ConsoleLogger } from 'src/_Common'
import { PrismaAccountRepository } from 'src/Auth/Infrastructure/Prisma/PrismaAccountRepository'
import { ExistsActiveEmailInRepository } from 'src/Auth/Domain/Spec/ExistsActiveEmailInRepository'

@Module({
  imports: [],
  controllers: [RegisterAccountController],
  providers: [
    RegisterAccountPresenter,
    { provide: RegisterAccountOutputPort, useExisting: RegisterAccountPresenter },
    { provide: RegisterAccountInputPort, useClass: RegisterAccountUsecase },
    AccountFactory,
    ExistsActiveEmailInRepository,
    IdGenerator,
    PrismaService,
    { provide: AccountRepository, useClass: PrismaAccountRepository },
    { provide: Logger, useValue: new ConsoleLogger('Auth/RegisterAccount') },
  ],
})
export default class {}
