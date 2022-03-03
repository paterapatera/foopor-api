import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { IdGenerator } from 'src/_Common'
import { Account, AccountId } from '../Account'
import { ExistsActiveEmailInRepository } from '../Spec'
import { AccountSpecError, AccountFactory } from '../AccountFactory'
import { Email } from '../Email'
import { Nickname } from '../Nickname'
import { Password } from '../Password'

describe('Domain/AccountFactory', () => {
  let module: TestingModuleBuilder

  beforeEach(async () => {
    module = Test.createTestingModule({
      providers: [
        AccountFactory,
        { provide: IdGenerator, useValue: { id: () => 'ABCDEF' } },
        {
          provide: ExistsActiveEmailInRepository,
          useValue: { isSatisfiedBy: async () => false },
        },
      ],
    })
  })

  describe('create()', () => {
    describe('正常系', () => {
      it('Accountが返されること', async () => {
        const app = await module.compile()

        const factory = app.get(AccountFactory)

        const email = new Email('email@aa.com')
        const password = new Password('password')
        const nickname = new Nickname('Nick Name')
        const account = await factory.create({ email, password, nickname })
        expect(account.same(new Account(new AccountId('ABCDEF'), email, password, nickname))).toBeTruthy()
      })
    })

    describe('Emailがすでに存在する場合', () => {
      it('エラーが返されること', async () => {
        const app = await module
          .overrideProvider(ExistsActiveEmailInRepository)
          .useValue({ isSatisfiedBy: async () => true, getJsonReports: () => {} })
          .compile()
        const factory = app.get(AccountFactory)

        const email = new Email('email@bb.com')
        const password = new Password('password')
        const nickname = new Nickname('Nick Name')
        factory.create({ email, password, nickname }).catch((e) =>
          expect(() => {
            throw e
          }).toThrowError(AccountSpecError),
        )
      })
    })
  })
})
