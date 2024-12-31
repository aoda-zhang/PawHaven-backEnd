import path from 'node:path'
import ACLModule from '@modules/ACL/ACLs.module'
import AuthModule from '@modules/Auth/auth.module'
import { TripModule } from '@modules/Trip/trip.module'
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
            microServiceNames: [MSClientNames.MS_TRIP],
            isIntergrateHttpExceptionFilter: true,
            isIntergrateHttpInterceptor: true
        }),
        TripModule
        // UserModule
        // AuthModule,
        // ACLModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
