import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common'
import { HttpResType } from './interface'
// 全局错误拦截处理
@Injectable()
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp() // 获取请求上下文
        const response = ctx.getResponse()
        const errorRes = exception.getResponse()
        // 设置错误信息
        // @ts-ignore
        const message = errorRes?.message
            ? // @ts-ignore
              errorRes?.message
            : exception?.message
              ? exception.message
              : 'Service error'

        const status = exception.getStatus()
            ? exception.getStatus()
            : // @ts-ignore
              (errorRes?.statusCode ?? 400)
        const errorResponse: HttpResType = {
            status,
            isSuccess: false,
            message,
            data: response?.data ?? null
        }
        response.status(status)
        response.send(errorResponse)
    }
}
