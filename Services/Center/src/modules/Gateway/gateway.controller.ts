import { All, Body, Controller, Param, Req } from '@nestjs/common'
import GatewayService from './gateway.service'
@Controller('*')
class GatewayController {
    constructor(private readonly gatewayService: GatewayService) {}

    @All()
    forwardRequest(@Param() params: Record<string, any>, @Req() request: Request) {
        return this.gatewayService.forwardMSRequest({ params, request })
    }
}
export default GatewayController
