import { Email, EmailInvalid } from '../Email'

describe('Domain/Email', () => {
  describe('new Email()', () => {
    describe('正常系', () => {
      it('エラーが出ないこと', () => {
        new Email('email@aa.com')
      })
    })
    describe('メールアドレスが不正', () => {
      it('エラーになること', () => {
        expect(() => new Email('email')).toThrowError(EmailInvalid)
      })
    })
  })
})
