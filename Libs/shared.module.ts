import { Global, Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import HealthCheckModule from './core/healthCheck/health.module'
import HttpExceptionFilter from './core/http/httpExceptionFilter'
import HttpInterceptor from './core/http/httpInterceptor'
import SpeedlimitModule from './core/speedlimit/speedlimit.module'
import MiddlewareModule from './middlewares/index.module'

@Global()
@Module({
    // imports: [DatabaseModule, SpeedlimitModule, MiddlewareModule, HealthCheckModule],
    imports: [SpeedlimitModule,MiddlewareModule],
    providers: [
        // 成功请求拦截
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpInterceptor
        },
        // 错误请求拦截
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ],
})
export default class SharedModule {}
