import { Module } from '@nestjs/common'
import RegisterAccountModule from 'src/Auth/Presentation/RegisterAccount/Module'

@Module({
  imports: [RegisterAccountModule],
})
export default class {}
