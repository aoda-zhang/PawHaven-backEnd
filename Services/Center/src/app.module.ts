import path from 'node:path'
import ACLModule from '@modules/ACL/ACLs.module'
import AuthModule from '@modules/Auth/auth.module'
import { Module } from '@nestjs/common'
import { DBNames, EnvConstant } from '@shared/constants/constant'
import SharedModule from '@shared/shared.module'
import UserModule from './modules/User/user.module'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)

@Module({
    imports: [
        SharedModule.forRoot({ configFilePath, DBConnectKeys: [DBNames.DB_CENTER] }),
        UserModule,
        AuthModule,
        ACLModule
    ],
    providers: []
})
export class AppModule {}
