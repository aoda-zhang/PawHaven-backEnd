import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Injectable,
    HttpStatus
} from '@nestjs/common'
import type { HttpResType } from './interface'

@Injectable()
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        const exceptionResponse = exception.getResponse()
        let message = 'Service error'
        let status = HttpStatus.BAD_REQUEST

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse
        } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
            message = (exceptionResponse as any).message || message
            status = (exceptionResponse as any).statusCode || exception.getStatus()
        } else {
            message = exception.message || message
            status = exception.getStatus()
        }

        const errorResponse: HttpResType = {
            status,
            isSuccess: false,
            message,
            data: null
        }

        response.status(status).json(errorResponse)
    }
}
