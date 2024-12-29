import path from 'node:path'
import ACLModule from '@modules/ACL/ACLs.module'
import AuthModule from '@modules/Auth/auth.module'
import { GatewayModule } from '@modules/Gateway/gateway.module'
import { Module } from '@nestjs/common'
import { MSClientNames } from '@shared/constants/constant'
import SharedModule from '@shared/shared.module'
import getConfigValues, { EnvConstant } from '@shared/utils/getConfigValues'
import UserModule from './modules/User/user.module'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)

@Module({
    imports: [
        SharedModule.forRoot({
            configValues: getConfigValues(configFilePath),
            configFilePath,
            limitKey: 'limitation',
            microServiceNames: [MSClientNames.MS_TRIP, MSClientNames.MS_DOCUMENT]
        }),
        GatewayModule,
        UserModule
        // AuthModule,
        // ACLModule
    ],
    providers: []
})
export class AppModule {}
