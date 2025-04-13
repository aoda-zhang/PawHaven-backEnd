import path from 'node:path'
import ACLModule from '@modules/ACL/ACLs.module'
import AuthModule from '@modules/Auth/auth.module'
import { TripModule } from '@modules/Trip/trip.module'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import SignGuard from '@shared/guards/Sign.guard'
import SharedModule from '@shared/shared.module'
import { DocumentModule } from '@modules/Document/document.module'
import { EnvConstant } from '@shared/constants/constant'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)

@Module({
    imports: [
        SharedModule.forRoot({
            configFilePath,
            isIntergrateHttpExceptionFilter: true,
            isIntergrateHttpInterceptor: true
        }),
        TripModule,
        DocumentModule
        // UserModule,
        // AuthModule,
        // ACLModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: SignGuard
        }
    ]
})
export class AppModule {}
