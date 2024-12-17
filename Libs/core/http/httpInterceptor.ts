import {
    type CallHandler,
    type ExecutionContext,
    Injectable,
    type NestInterceptor
} from '@nestjs/common'
import { type Observable, map } from 'rxjs'
import type { HttpResType } from './interface'
// 全局成功请求拦截处理
@Injectable()
export default class HttpInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const status = context?.switchToHttp()?.getResponse()?.statusCode ?? 200
                const successResponse: HttpResType = {
                    status,
                    isSuccess: true,
                    message: '请求成功',
                    data
                }
                return successResponse
            })
        )
    }
}
