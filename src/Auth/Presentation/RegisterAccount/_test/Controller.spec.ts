import { Test, TestingModuleBuilder } from '@nestjs/testing'
import {
  RegisterAccountController,
  RegisterAccountPresenter,
  RequestBody,
} from 'src/Auth/Presentation/RegisterAccount/Controller'
import { RegisterAccountInputData, RegisterAccountInputPort } from 'src/Auth/Application/RegisterAccount/IO'
import { RegisterAccountUsecase } from 'src/Auth/Application/RegisterAccount/Usecase'

describe('Presentation/RegisterAccount/Controller', () => {
  let module: TestingModuleBuilder

  beforeEach(async () => {
    module = Test.createTestingModule({
      controllers: [RegisterAccountController],
      providers: [
        { provide: RegisterAccountPresenter, useValue: { response: () => {} } },
        { provide: RegisterAccountInputPort, useClass: RegisterAccountUsecase },
      ],
    })
  })

  describe('正常系', () => {
    it('Usecaseの入力が正しいこと', async () => {
      const app = await module
        .overrideProvider(RegisterAccountInputPort)
        .useValue({
          execute: (inputData: RegisterAccountInputData) => {
            expect(inputData).toEqual({
              email: 'email@aa.com',
              password: 'pass',
              nickname: 'Nick Name',
            })
          },
        })
        .compile()
      const controller = app.get(RegisterAccountController)

      const body = new RequestBody()
      body.email = 'email@aa.com'
      body.password = 'pass'
      body.nickname = 'Nick Name'
      return controller.getAuth(body)
    })
  })
})
