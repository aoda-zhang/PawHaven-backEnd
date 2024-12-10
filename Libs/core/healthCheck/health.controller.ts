import { Controller, Get, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck } from '@nestjs/terminus'
import type { Request } from 'express'

import NoHMAC from '@shared/decorators/noHMAC.decorator'
import NoToken from '@shared/decorators/noToken.decorator'

import type { HealthService } from './health.service'

@Controller('checker')
@ApiTags('System health check')
export class HealthController {
    constructor(private readonly health: HealthService) {}

    @NoToken()
    @Get('/health')
    @HealthCheck()
    healthChecker() {
        return this.health.healthChecker()
    }

    @NoToken()
    @NoHMAC()
    @Get('/ping')
    pingChecker(@Req() request: Request) {
        return this.health.pingCheck(request?.url)
    }
}
