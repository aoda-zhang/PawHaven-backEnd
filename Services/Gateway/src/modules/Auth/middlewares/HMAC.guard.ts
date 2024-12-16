import {
    BadRequestException,
    type CanActivate,
    type ExecutionContext,
    Injectable
} from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import type { Reflector } from '@nestjs/core'
import trime from '@shared/utils/trime'
import type { EncryptService } from '../encrypt.service'
import { HttpBusinessCode, HttpBusinessMappingCode, HttpReqHeader } from '@shared/core/http/interface'
import { Decorators } from '@shared/types/enum'

@Injectable()
export default class HMACGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private configService: ConfigService,
        private encryptService: EncryptService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()
        const isNoHMACReq = this.reflector.getAllAndOverride<boolean>(Decorators.noHMAC, [
            context.getHandler(),
            context.getClass()
        ])

        try {
            // skip verify HMAC if isNoHMACReq route or NO enable HMAC
            if (!this.configService.get('auth.enableHMAC') || isNoHMACReq) {
                return true
            }
            const clientTimestamp = `${request?.headers?.[HttpReqHeader?.timestamp] ?? ''}`
            const clientHMAC = request?.headers?.[HttpReqHeader?.apiKey]

            // verify timestamp
            const isTimestampAvailable = this.encryptService.isTimestampAvailable(clientTimestamp)

            // verify HMAC
            const isPassedHMAC = this.encryptService.compareHMAC({
                request,
                clientTimestamp,
                clientHMAC
            })
            return isTimestampAvailable && isPassedHMAC
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
