import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'

import { HttpSettingMiddleware } from './httpSetting.middleware'
import { LanguageMiddleware } from './language.middleware'

@Module({
    imports: [],
    providers: [HttpSettingMiddleware]
})
export default class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(HttpSettingMiddleware, LanguageMiddleware)
            .exclude()
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
