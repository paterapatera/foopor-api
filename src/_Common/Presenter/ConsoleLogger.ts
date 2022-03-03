import { Injectable } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { Logger } from 'src/_Common/Application/IO'

@Injectable()
export class ConsoleLogger extends Logger {
  private colorIfCan = (colorNum: string) => (str: string) =>
    process.env.NO_COLOR ? str : `\u001b[${colorNum}m${str}\u001b[39m`
  private template(data: unknown, level: string, color: (str: string) => string) {
    const pidStr = `${process.pid}  - `
    const timestampStr = dayjs().format('YYYY/MM/DD HH:mm:ss.SSS')
    const contextStr = this.context ? color(`[${this.context}] `) : ''
    const formattedLogLevel = color(level.padStart(5, ' '))
    return `${pidStr}${timestampStr} ${formattedLogLevel} ${contextStr}${data}\n`
  }

  info(data: unknown): void {
    if (process.env.NODE_ENV === 'test') return
    console.info(this.template(data, 'INFO', this.colorIfCan('92')))
  }
  error(data: unknown): void {
    if (process.env.NODE_ENV === 'test') return
    console.error(this.template(data, 'ERROR', this.colorIfCan('91')))
  }
  warn(data: unknown): void {
    if (process.env.NODE_ENV === 'test') return
    console.warn(this.template(data, 'WARN', this.colorIfCan('93')))
  }
  debug(data: unknown): void {
    if (!['local', 'development'].includes(process.env.NODE_ENV || '')) return
    console.debug(this.template(data, 'DEBUG', this.colorIfCan('95')))
  }
}
