import { Module } from '@nestjs/common'
import AuthModule from 'src/Auth/Module'

@Module({
  imports: [AuthModule],
})
export class MainModule {}
