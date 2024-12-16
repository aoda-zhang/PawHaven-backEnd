import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'

import { ApiSettingMiddleware } from './httpSetting.middleware'

@Module({
    imports: [],
    providers: [ApiSettingMiddleware]
})
export default class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ApiSettingMiddleware)
            .exclude()
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
