import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { StandardOutputPort, Logger } from 'src/_Common/Application/IO'

@Injectable()
export abstract class ApiPresenter<T> implements StandardOutputPort<T> {
  private res?: T | Error
  constructor(protected logger: Logger) {}
  response(): T {
    if (!this.res) throw new InternalServerErrorException('Not Response')
    if (this.res instanceof Error) throw this.res
    return this.res
  }
  success(output: T): void {
    this.res = output
  }
  badRequest(data?: Error): void {
    if (data) this.logger.warn(`${data.name}:${data.message}`)
    this.res = new BadRequestException(data?.name)
  }
  internalServerError(data: Error): void {
    this.logger.error(`${data.name}:${data.message}`)
    this.res = new InternalServerErrorException()
  }
  notFound(): void {
    this.res = new NotFoundException()
  }
  unauthorized(data?: Error): void {
    if (data) this.logger.warn(`${data.name}:${data.message}`)
    this.res = new UnauthorizedException(data?.name)
  }
}
