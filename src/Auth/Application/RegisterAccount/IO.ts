import { StandardOutputPort } from 'src/_Common'

export type RegisterAccountInputData = { email: string; password: string; nickname: string }
export type RegisterAccountOutputData = { result: string }

export abstract class RegisterAccountInputPort {
  abstract execute(inputData: RegisterAccountInputData): Promise<void>
}
export abstract class RegisterAccountOutputPort extends StandardOutputPort<RegisterAccountOutputData> {}
