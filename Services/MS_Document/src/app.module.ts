import path from 'node:path'
import { Module } from '@nestjs/common'
import { EnvConstant } from '@shared/constants/constant'
import SharedModule from '@shared/shared.module'
import EmailModule from './Email/email.module'
import PDFModule from './PDF/PDF.module'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
@Module({
    imports: [
        SharedModule.forRoot({ configFilePath, DBConnectKey: ['DB_DOCUMENT'] }),
        EmailModule,
        PDFModule
    ],
    providers: []
})
export default class AppModule {}
