import path from 'node:path'
import { Module } from '@nestjs/common'
import SharedModule from '@shared/shared.module'
import EmailModule from './Email/email.module'
import PDFModule from './PDF/PDF.module'
import { EnvConstant } from '@shared/constants/constant'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
@Module({
    imports: [
        SharedModule.forRoot({
            configFilePath
        }),
        EmailModule,
        PDFModule
    ],
    providers: []
})
export class AppModule {}
