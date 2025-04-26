import { Injectable } from '@nestjs/common'
import {
    DiskHealthIndicator,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator,
    MongooseHealthIndicator
} from '@nestjs/terminus'

export enum HealthStatus {
    ok = 'ok',
    error = 'error',
    shutting_down = 'ok'
}

@Injectable()
export class HealthService {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
        private mongodb: MongooseHealthIndicator
    ) {}

    healthChecker = async () => {
        return this.health.check([
            // Check if the gateway service is reachable
            async () =>
                this.http.pingCheck('gateway-service', 'http://http://130.33.242.136/api/ping'),

            // Check if MongoDB connection is healthy
            async () => this.mongodb.pingCheck('mongo-db'),

            // Check if disk storage usage is under threshold
            async () =>
                this.disk.checkStorage('disk-storage', {
                    thresholdPercent: 0.9, // Mark as unhealthy if usage exceeds 90%
                    path: '/' // Root path (use 'C:\\' for Windows)
                }),

            // Check heap memory usage
            async () => this.memory.checkHeap('memory-heap', 300 * 1024 * 1024),
            // 300 MB threshold for heap memory

            // Check RSS (Resident Set Size) memory usage
            async () => this.memory.checkRSS('memory-rss', 500 * 1024 * 1024)
            // 500 MB threshold for RSS memory
        ])
    }
    ping = async () => {
        return 'hello world!'
    }
}
