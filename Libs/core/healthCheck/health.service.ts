import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
    DiskHealthIndicator,
    HealthCheckService,
    MemoryHealthIndicator,
    MongooseHealthIndicator
} from '@nestjs/terminus'

@Injectable()
export class HealthService {
    constructor(
        private readonly healthCheck: HealthCheckService,
        private readonly disk: DiskHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
        private readonly mongodb: MongooseHealthIndicator,
        private readonly config: ConfigService
    ) {}

    healthChecker = async () => {
        const healthInfo = await this.healthCheck.check([
            () => this.disk.checkStorage('diskHealth', { thresholdPercent: 0.8, path: '/' }),
            () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
            () => this.mongodb.pingCheck('mongodbHealth', { timeout: 10 })
        ])
        switch (healthInfo?.status) {
            case 'ok':
            case 'shutting_down':
                return healthInfo?.info
            case 'error':
                return healthInfo?.error
            default:
                return healthInfo?.info
        }
    }

    pingCheck = (pingURL: string) => {
        if (pingURL === this.config.get('ping.url')) {
            return 'hello world'
        }
        throw new BadGatewayException('连接失败,请重新尝试')
    }
}
