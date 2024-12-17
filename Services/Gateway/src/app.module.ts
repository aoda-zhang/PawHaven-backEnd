import { Module } from '@nestjs/common'

import ACLModule from '@modules/ACL/ACLs.module'
import AuthModule from '@modules/Auth/auth.module'
import SharedModule from '@shared/shared.module'

import { ConfigModule } from '@nestjs/config'
import getConfigs from './config'
import UserModule from './modules/User/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [getConfigs],
            envFilePath: '.env',
            isGlobal: true,
            cache: true
        }),
        SharedModule,
        UserModule,
        AuthModule,
        ACLModule
    ],
    providers: []
})
export class AppModule {}
