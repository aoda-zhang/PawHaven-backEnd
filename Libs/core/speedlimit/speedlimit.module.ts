import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'

@Module({})
class SpeedlimitModule {
    static forRoot(limitKey: string): DynamicModule {
        return {
            module: SpeedlimitModule,
            imports: [
                ThrottlerModule.forRootAsync({
                    // 100 times 1 minutes
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => {
                        const limitation: ThrottlerModuleOptions = configService.get(limitKey)
                        return {
                            ...limitation,
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
        }
    }
}

export default SpeedlimitModule
