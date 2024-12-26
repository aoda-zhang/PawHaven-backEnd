import { Module } from '@nestjs/common'
import HttpClientModule from '@shared/core/httpClient/httpClient.module'
import GatewayController from './gateway.controller'
import GatewayService from './gateway.service'
@Module({
    imports: [HttpClientModule],
    controllers: [GatewayController],
    providers: [GatewayService]
})
export class GatewayModule {}
