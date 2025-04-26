import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck } from '@nestjs/terminus'
import { HealthService } from './health.service'

@Controller()
@ApiTags('System health check')
export class HealthController {
    constructor(private readonly health: HealthService) {}

    @Get('/health')
    @HealthCheck()
    healthChecker() {
        return this.health.healthChecker()
    }

    @Get('/ping')
    ping() {
        return this.health.ping()
    }
}
