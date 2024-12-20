import path from 'node:path'
import { Module } from '@nestjs/common'
import { EnvConstant } from '@shared/constants/constant'
import SharedModule from '@shared/shared.module'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
@Module({
    imports: [SharedModule.forRoot({ configFilePath, DBConnectKey: ['DB_TRIP'] })],
    providers: []
})
export class AppModule {}
