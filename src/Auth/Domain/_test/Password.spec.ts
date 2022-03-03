import { Password, PasswordInvalid } from '../Password'

describe('Domain/Password', () => {
  describe('new Password', () => {
    describe('正常系', () => {
      it('エラーが出ないこと', () => {
        new Password('password')
      })
    })
    describe('パスワードが6文字未満', () => {
      it('エラーになること', () => {
        expect(() => new Password('pass')).toThrowError(PasswordInvalid)
      })
    })
  })
})
