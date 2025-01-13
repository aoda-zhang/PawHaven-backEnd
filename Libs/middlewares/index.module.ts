import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { HttpSettingMiddleware } from './httpSetting.middleware'

@Module({
    imports: [],
    providers: [HttpSettingMiddleware]
})
export default class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(HttpSettingMiddleware)
            .exclude()
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
