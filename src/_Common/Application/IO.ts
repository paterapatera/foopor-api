export abstract class StandardOutputPort<T> {
  abstract success(output: T): void
  abstract badRequest(data?: Error): void
  abstract internalServerError(data: Error): void
  abstract notFound(): void
  abstract unauthorized(data?: Error): void
}

export abstract class Logger {
  constructor(protected context?: string) {}
  abstract info(data: unknown): void
  abstract error(data: unknown): void
  abstract warn(data: unknown): void
  abstract debug(data: unknown): void
}
