import { Global, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import ACLModule from '@modules/ACL/ACLs.module'
import ACLGuard from '@modules/ACL/middlewares/ACL.guard'
import HMACGuard from '@modules/Auth/middlewares/HMAC.guard'
import JWTGuard from '@modules/Auth/middlewares/JWT.guard'
import UserModule from '@modules/User/user.module'
import { UserSchema } from '@shared/schemas/user.schema'
import { DBCollection } from 'src/models/gateway.DBcollection'

import { AuthController } from './auth.controller'
import AuthService from './auth.service'
import { EncryptService } from './encrypt.service'
// 提升为全局模块
@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: DBCollection.USER, schema: UserSchema }]),
        JwtModule,
        ACLModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        EncryptService,
        {
            provide: APP_GUARD,
            useClass: HMACGuard
        },
        {
            provide: APP_GUARD,
            useClass: JWTGuard
        },
        {
            provide: APP_GUARD,
            useClass: ACLGuard
        }
    ],
    exports: [AuthService, EncryptService]
})
export default class AuthModule {}
