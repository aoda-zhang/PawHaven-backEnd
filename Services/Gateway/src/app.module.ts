import { Module } from '@nestjs/common'

import ACLModule from '@modules/ACL/ACLs.module'
import AuthModule from '@modules/Auth/auth.module'
import SharedModule from '@shared/shared.module'

import UserModule from './modules/User/user.module'

@Module({
    imports: [SharedModule, UserModule, AuthModule, ACLModule],
    providers: []
})
export class AppModule {}
