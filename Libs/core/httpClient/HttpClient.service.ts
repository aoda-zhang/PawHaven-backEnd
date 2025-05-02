import { HttpService } from '@nestjs/axios'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { catchError, map, retry } from 'rxjs/operators'
import { firstValueFrom, timer } from 'rxjs'
import { ConfigService } from '@nestjs/config'

interface RequestOptions {
    headers?: Record<string, string>
    config?: AxiosRequestConfig
}

class HttpClientInstance {
    private readonly logger = new Logger(HttpClientInstance.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly baseURL: string,
        private readonly defaultHeaders: Record<string, string>,
        private readonly retryCount: number,
        private readonly retryDelay: number
    ) {}

    private getFullURL(baseURL: string, path: string): string {
        const cleanedBase = baseURL?.trim().replace(/\/+$/, '')
        const cleanedPath = path?.trim().replace(/^\/+/, '')

        if (!cleanedBase || !cleanedPath) {
            throw new Error(`Missing baseURL or path: base="${baseURL}", path="${path}"`)
        }
        const fullUrl = `${cleanedBase}/${cleanedPath}`
        return fullUrl
    }

    private async request<T>(
        method: 'get' | 'post' | 'put' | 'delete',
        url: string,
        data?: any,
        options?: RequestOptions
    ): Promise<T> {
        const fullUrl = this.getFullURL(this.baseURL, url)
        const headers = {
            ...this.defaultHeaders,
            ...options?.headers
        }
        const requestConfig: AxiosRequestConfig = {
            ...options?.config,
            headers,
            url: fullUrl,
            method,
            data
        }

        try {
            const response = await firstValueFrom(
                this.httpService.request<T>(requestConfig).pipe(
                    retry({
                        count: this.retryCount,
                        delay: () => timer(this.retryDelay)
                    }),
                    map((res: AxiosResponse<T>) => res.data),
                    catchError((error: AxiosError) => {
                        this.logger.error(`HTTP ${method.toUpperCase()} ${fullUrl} failed`, error)
                        if (error?.code === 'ECONNABORTED') {
                            throw new HttpException('Request timeout', HttpStatus.GATEWAY_TIMEOUT)
                        }
                        if (!error?.response) {
                            throw new HttpException(
                                'Service unavailable',
                                HttpStatus.SERVICE_UNAVAILABLE
                            )
                        }
                        throw new HttpException(
                            error?.response?.data || 'Remote service error',
                            error?.response?.status
                        )
                    })
                )
            )
            return response
        } catch (error) {
            this.logger.error(
                `Final request failed: ${method.toUpperCase()} ${fullUrl}`,
                error.message
            )
            throw error
        }
    }

    get<T>(url: string, options?: RequestOptions) {
        return this.request<T>('get', url, null, options)
    }

    post<T>(url: string, body: any, options?: RequestOptions) {
        return this.request<T>('post', url, body, options)
    }

    put<T>(url: string, body: any, options?: RequestOptions) {
        return this.request<T>('put', url, body, options)
    }

    delete<T>(url: string, options?: RequestOptions) {
        return this.request<T>('delete', url, null, options)
    }
}

@Injectable()
class HttpClientService {
    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService
    ) {}

    create(baseURL: string) {
        if (!baseURL) {
            throw new Error('HttpClientService: baseURL is required')
        }

        const defaultHeaders = {
            'X-App-Source': 'nestjs-gateway',
            'X-Env': this.config.get<string>('NODE_ENV') || 'development'
        }

        const retryCount = this.config.get<number>('http.retryCount') || 3
        const retryDelay = this.config.get<number>('http.retryDelay') || 1000

        return new HttpClientInstance(
            this.httpService,
            baseURL.trim(),
            defaultHeaders,
            retryCount,
            retryDelay
        )
    }
}

export default HttpClientService
