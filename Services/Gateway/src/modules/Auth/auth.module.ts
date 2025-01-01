import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import ACLModule from '@modules/ACL/ACLs.module'
import ACLGuard from '@modules/ACL/middlewares/ACL.guard'
import JWTGuard from '@modules/Auth/middlewares/JWT.guard'
import UserModule from '@modules/User/user.module'
import SignGuard from '@shared/guards/Sign.guard'

import CommonDBCollections from '@shared/models/common.DBcollection'
import { UserSchema } from '@shared/models/user.schema'
import { AuthController } from './auth.controller'
import AuthService from './auth.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CommonDBCollections.USER, schema: UserSchema }]),
        JwtModule,
        ACLModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: JWTGuard
        },
        {
            provide: APP_GUARD,
            useClass: ACLGuard
        }
    ],
    exports: [AuthService]
})
export default class AuthModule {}
