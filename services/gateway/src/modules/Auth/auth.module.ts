import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

// import ACLModule from '@modules/ACL/ACLs.module'
import { AuthController } from './auth.controller'
import AuthService from './auth.service'

@Module({
    // imports: [JwtModule, ACLModule],
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export default class AuthModule {}
