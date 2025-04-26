import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
    DiskHealthIndicator,
    HttpHealthIndicator,
    MemoryHealthIndicator,
    MongooseHealthIndicator
} from '@nestjs/terminus'

export enum HealthStatus {
    ok = 'ok',
    error = 'error',
    shutting_down = 'shutting_down'
}

@Injectable()
export class HealthService {
    constructor(
        private http: HttpHealthIndicator,
        private disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
        private mongodb: MongooseHealthIndicator,
        private config: ConfigService
    ) {}

    private wrap = async (key: string, checker: () => Promise<any>) => {
        try {
            const result = await checker()
            return {
                key,
                status: HealthStatus.ok,
                info: result
            }
        } catch (err) {
            return {
                key,
                status: HealthStatus.error,
                error: err?.message || 'Unknown error'
            }
        }
    }

    healthChecker = async () => {
        const checks = [
            this.wrap('gateway-service', async () =>
                this.http.pingCheck('gateway-service', this.config.get('health.ping'))
            ),
            this.wrap('mongo-db', async () => this.mongodb.pingCheck('mongo-db')),
            this.wrap('disk-storage', async () =>
                this.disk.checkStorage('disk-storage', {
                    thresholdPercent: 0.9,
                    path: '/'
                })
            ),
            this.wrap('memory-heap', async () =>
                this.memory.checkHeap('memory-heap', 300 * 1024 * 1024)
            ),
            this.wrap('memory-rss', async () =>
                this.memory.checkRSS('memory-rss', 500 * 1024 * 1024)
            )
        ]

        const results = await Promise.all(checks)

        const success = results.filter((r) => r.status === HealthStatus.ok)
        const error = results.filter((r) => r.status === HealthStatus.error)

        return {
            success,
            error
        }
    }

    ping = async () => {
        return 'hello world!'
    }
}
