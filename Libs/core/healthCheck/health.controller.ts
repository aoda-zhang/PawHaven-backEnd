import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck } from '@nestjs/terminus'
import { HealthService } from './health.service'
import NoSign from '../../decorators/noSIgn.decorator'
import NoToken from '../../decorators/noToken.decorator'

@Controller()
@ApiTags('System health check')
export class HealthController {
    constructor(private readonly health: HealthService) {}

    @NoToken()
    @NoSign()
    @Get('/health')
    @HealthCheck()
    healthChecker() {
        return this.health.healthChecker()
    }

    @NoToken()
    @NoSign()
    @Get('/ping')
    ping() {
        return this.health.ping()
    }
}
