import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'

import { LoggerMiddleware } from '@shared/core/logger/logger.middleware'

import { ApiSettingMiddleware } from './httpSetting.middleware'

@Module({
    imports: []
})
export default class MiddlewareModule implements NestModule {
    // eslint-disable-next-line class-methods-use-this
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ApiSettingMiddleware, LoggerMiddleware)
            .exclude()
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
