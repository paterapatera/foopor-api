import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ApiPresenter, Logger } from 'src/_Common'

class Presenter extends ApiPresenter<{ v: string }> {}

describe('_Common/Presentation/Presenter', () => {
  let app: TestingModule

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        Presenter,
        { provide: Logger, useValue: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} } },
      ],
    }).compile()
  })

  describe('success()', () => {
    it('値が返されること', () => {
      const presenter = app.get(Presenter)

      presenter.success({ v: 'OK' })
      expect(presenter.response()).toEqual({ v: 'OK' })
    })
  })
  describe('badRequest()', () => {
    it('エラーになること', () => {
      const presenter = app.get(Presenter)

      presenter.badRequest()
      expect(() => presenter.response()).toThrowError(BadRequestException)
    })
  })
  describe('internalServerError()', () => {
    it('エラーになること', () => {
      const presenter = app.get(Presenter)

      presenter.internalServerError(new Error())
      expect(() => presenter.response()).toThrowError(InternalServerErrorException)
    })
  })
  describe('notFound()', () => {
    it('エラーになること', () => {
      const presenter = app.get(Presenter)

      presenter.notFound()
      expect(() => presenter.response()).toThrowError(NotFoundException)
    })
  })
  describe('unauthorized()', () => {
    it('エラーになること', () => {
      const presenter = app.get(Presenter)

      presenter.unauthorized()
      expect(() => presenter.response()).toThrowError(UnauthorizedException)
    })
  })
  describe('レスポンスがない場合', () => {
    it('エラーになること', () => {
      const presenter = app.get(Presenter)

      expect(() => presenter.response()).toThrowError(InternalServerErrorException)
    })
  })
})
