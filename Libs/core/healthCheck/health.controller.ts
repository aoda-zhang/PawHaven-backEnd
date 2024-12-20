import { Controller, Get, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck } from '@nestjs/terminus'
import { Request } from 'express'

import { HealthService } from './health.service'

@Controller('checker')
@ApiTags('System health check')
export class HealthController {
    constructor(private readonly health: HealthService) {}

    @Get('/health')
    @HealthCheck()
    healthChecker() {
        return this.health.healthChecker()
    }

    @Get('/ping')
    pingChecker(@Req() request: Request) {
        return this.health.pingCheck(request?.url)
    }
}
