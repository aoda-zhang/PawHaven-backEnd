import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { Decorators } from '@shared/constants/enum'
import {
    HttpBusinessCode,
    HttpBusinessMappingCode,
    HttpReqHeader
} from '@shared/core/httpClient/interface'
import trime from '@shared/utils/trime'
import { EncryptService } from '../encrypt.service'

@Injectable()
export default class SignGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private configService: ConfigService,
        private encryptService: EncryptService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()
        const isNoSignReq = this.reflector.getAllAndOverride<boolean>(Decorators.noSign, [
            context.getHandler(),
            context.getClass()
        ])

        try {
            // skip verify Sign if isNoSignReq route or NO enable Sign
            if (!this.configService.get('auth.enableSign') || isNoSignReq) {
                return true
            }
            const clientTimestamp = `${request?.headers?.[HttpReqHeader?.timestamp] ?? ''}`
            const clientSign = request?.headers?.[HttpReqHeader?.sign]

            // verify timestamp
            const isTimestampAvailable = this.encryptService.isTimestampAvailable(clientTimestamp)

            // verify Sign
            const isPassedSign = this.encryptService.compareSign({
                request,
                clientTimestamp,
                clientSign
            })
            return isTimestampAvailable && isPassedSign
        } catch (error) {
            switch (trime(error?.message)) {
                // 根据不同的错误情况，设置特定的业务code，方便前端做对应处理
                case HttpBusinessCode.jwtexpired || HttpBusinessCode.invalidToken:
                    response.data = HttpBusinessMappingCode.jwtexpired
                    break
                default:
                    break
            }
            throw new BadRequestException(`error:${error}`)
        }
    }
}
