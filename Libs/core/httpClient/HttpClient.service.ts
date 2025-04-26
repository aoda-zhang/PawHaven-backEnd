import { HttpService } from '@nestjs/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { catchError, map, retry } from 'rxjs/operators'
import { firstValueFrom, timer } from 'rxjs'
import { ConfigService } from '@nestjs/config'
import { AxiosError } from 'axios'

@Injectable()
class HttpClientService {
    private readonly logger = new Logger(HttpClientService.name)
    private readonly baseURL: string
    private readonly defaultHeaders: Record<string, string>

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService
    ) {
        this.baseURL = this.config.get<string>('http.baseURL') ?? ''
        this.defaultHeaders = {
            'X-App-Source': 'nestjs-gateway',
            'X-Env': this.config.get<string>('NODE_ENV') || 'development'
        }
    }

    private async request<T>(
        method: 'get' | 'post' | 'put' | 'delete',
        url: string,
        data?: any,
        customHeaders?: Record<string, string>,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const fullUrl = `${this.baseURL}${url}`
        const headers = {
            ...this.defaultHeaders,
            ...customHeaders
        }

        const requestConfig: AxiosRequestConfig = {
            ...config,
            headers,
            url: fullUrl,
            method,
            data
        }

        const retryCount = this.config.get<number>('http.retryCount') || 3
        const retryDelay = this.config.get<number>('http.retryDelay') || 1000

        try {
            const response = await firstValueFrom(
                this.httpService.request<T>(requestConfig).pipe(
                    retry({
                        count: retryCount,
                        delay: () => timer(retryDelay)
                    }),
                    map((res: AxiosResponse<T>) => res.data),
                    catchError((error: AxiosError) => {
                        this.logger.error(
                            `HTTP ${method.toUpperCase()} ${fullUrl} failed`,
                            error.message
                        )
                        if (error?.code === 'ECONNABORTED') {
                            throw new HttpException('请求超时', HttpStatus.GATEWAY_TIMEOUT)
                        }
                        if (!error?.response) {
                            throw new HttpException('服务不可用', HttpStatus.SERVICE_UNAVAILABLE)
                        }
                        throw new HttpException(
                            error?.response?.data || '远程服务错误',
                            error?.response?.status
                        )
                    })
                )
            )
            return response
        } catch (error) {
            this.logger.error(`最终请求失败: ${method.toUpperCase()} ${fullUrl}`, error.message)
            throw error
        }
    }

    get<T>(url: string, headers?: Record<string, string>) {
        return this.request<T>('get', url, null, headers)
    }

    post<T>(url: string, body: Record<string, string>, headers?: Record<string, string>) {
        return this.request<T>('post', url, body, headers)
    }

    put<T>(url: string, body: Record<string, string>, headers?: Record<string, string>) {
        return this.request<T>('put', url, body, headers)
    }

    delete<T>(url: string, headers?: Record<string, string>) {
        return this.request<T>('delete', url, null, headers)
    }
}

export default HttpClientService
