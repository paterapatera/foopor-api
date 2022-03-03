import { Test } from '@nestjs/testing'
import { Account, AccountId } from '../../Account'
import { ExistsActiveEmailInRepository } from '../../Spec'
import { AccountRepository } from '../../AccountRepository'
import { Email } from '../../Email'
import { Nickname } from '../../Nickname'
import { Password } from '../../Password'

describe('Domain/Spec/ExistsActiveEmailInRepository', () => {
  let spec: ExistsActiveEmailInRepository
  beforeEach(async () => {
    const module = Test.createTestingModule({
      providers: [
        ExistsActiveEmailInRepository,
        {
          provide: AccountRepository,
          useValue: {
            findByActiveEmail: async (email: Email) => {
              const tmpEmail = new Email('email@bb.com')
              if (tmpEmail.same(email)) {
                return new Account(new AccountId('ABCDEF'), tmpEmail, new Password('aaaaaa'), new Nickname(''))
              }
              return undefined
            },
          },
        },
      ],
    })
    const app = await module.compile()
    spec = await app.resolve(ExistsActiveEmailInRepository)
  })

  describe('isSatisfiedBy()', () => {
    describe('Emailがすでに存在する', () => {
      let account: Account
      beforeEach(async () => {
        account = new Account(
          new AccountId('ABCDEF'),
          new Email('email@bb.com'),
          new Password('aaaaaa'),
          new Nickname(''),
        )
      })
      it('Trueが返されること', async () => {
        const result = await spec.isSatisfiedBy({ account })
        expect(result).toBeTruthy()
      })
    })
    describe('Emailが存在しない場合', () => {
      let account: Account
      beforeEach(async () => {
        account = new Account(
          new AccountId('ABCDEF'),
          new Email('email@aa.com'),
          new Password('aaaaaa'),
          new Nickname(''),
        )
      })
      it('Falseが返されること', async () => {
        const result = await spec.isSatisfiedBy({ account })
        expect(result).toBeFalsy()
      })
    })
  })
})
