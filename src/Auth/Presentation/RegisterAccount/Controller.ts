import { Body, Controller as DecController, Injectable, Post } from '@nestjs/common'
import { ApiPresenter } from 'src/_Common'
import { RegisterAccountInputPort, RegisterAccountOutputData } from 'src/Auth/Application/RegisterAccount/IO'

import { IsString, IsNotEmpty } from 'class-validator'

export class RequestBody {
  @IsNotEmpty()
  @IsString()
  nickname: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

@Injectable()
export class RegisterAccountPresenter extends ApiPresenter<RegisterAccountOutputData> {}

@DecController('account')
export class RegisterAccountController {
  constructor(public usecase: RegisterAccountInputPort, private presenter: RegisterAccountPresenter) {}
  @Post('register')
  async getAuth(@Body() body: RequestBody): Promise<RegisterAccountOutputData> {
    await this.usecase.execute(body)
    return this.presenter.response()
  }
}
