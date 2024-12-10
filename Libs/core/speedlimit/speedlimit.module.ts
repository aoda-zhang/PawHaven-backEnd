import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            // 100 times 1 minutes
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const limitation = configService.get('limitation')
                return {
                    ttl: limitation?.ttl ?? 60,
                    limit: limitation?.limit ?? 1000
                }
            },
            inject: [ConfigService]
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export default class SpeedlimitModule {}
