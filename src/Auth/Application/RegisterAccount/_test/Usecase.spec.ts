import { Test, TestingModuleBuilder } from '@nestjs/testing'
import {
  RegisterAccountInputPort,
  RegisterAccountOutputData,
  RegisterAccountOutputPort,
} from 'src/Auth/Application/RegisterAccount/IO'
import { Account, AccountId } from 'src/Auth/Domain/Account'
import { AccountFactory } from 'src/Auth/Domain/AccountFactory'
import { AccountRepository } from 'src/Auth/Domain/AccountRepository'
import { Email } from 'src/Auth/Domain/Email'
import { Nickname } from 'src/Auth/Domain/Nickname'
import { Password } from 'src/Auth/Domain/Password'
import { RegisterAccountUsecase } from '../Usecase'

describe('Application/RegisterAccount/Usecase', () => {
  let module: TestingModuleBuilder

  beforeEach(async () => {
    module = Test.createTestingModule({
      providers: [
        { provide: RegisterAccountInputPort, useClass: RegisterAccountUsecase },
        { provide: RegisterAccountOutputPort, useValue: {} },
        {
          provide: AccountFactory,
          useValue: {
            create: () =>
              new Account(new AccountId('ABCDEF'), new Email('aaa@ccc.bb'), new Password('aaaaaa'), new Nickname('')),
          },
        },
        { provide: AccountRepository, useValue: { insert: async () => {} } },
      ],
    })
  })

  describe('正常系', () => {
    it('結果がSuccessであること', async () => {
      const app = await module
        .overrideProvider(RegisterAccountOutputPort)
        .useValue({
          success: (outputData: RegisterAccountOutputData) => {
            expect(outputData).toEqual({ result: 'Success' })
          },
        })
        .compile()
      const usecase = app.get(RegisterAccountInputPort)
      return usecase.execute({
        email: 'email@aa.com',
        password: 'password',
        nickname: 'Nick Name',
      })
    })
  })
  describe('入力が不正の場合', () => {
    it('結果がBadRequestであること', async () => {
      const app = await module
        .overrideProvider(RegisterAccountOutputPort)
        .useValue({ badRequest: (data: Error) => expect(data).toBeInstanceOf(Error) })
        .compile()
      const usecase = app.get(RegisterAccountInputPort)
      return usecase.execute({
        email: 'email',
        password: 'password',
        nickname: 'Nick Name',
      })
    })
  })
  describe('登録失敗の場合', () => {
    it('結果がInternalServerErrorであること', async () => {
      const app = await module
        .overrideProvider(AccountRepository)
        .useValue({
          insert: async () => {
            throw new Error('test')
          },
        })
        .overrideProvider(RegisterAccountOutputPort)
        .useValue({
          internalServerError: (data: Error) => {
            expect(data.message).toEqual('test')
          },
        })
        .compile()
      const usecase = app.get(RegisterAccountInputPort)
      return usecase.execute({
        email: 'email@aa.com',
        password: 'password',
        nickname: 'Nick Name',
      })
    })
  })
})
