import { HttpService } from '@nestjs/axios';
import {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common';
import {
    catchError,
    map,
    retry,
} from 'rxjs/operators';
import { firstValueFrom, timer } from 'rxjs';
import { ConfigService } from '@nestjs/config';

interface RequestOptions {
    headers?: Record<string, string>;
    config?: AxiosRequestConfig;
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

@Injectable()
class HttpClientService {
    private readonly logger = new Logger(HttpClientService.name);
    private readonly defaultHeaders: Record<string, string>;
    private readonly retryCount: number;
    private readonly retryDelay: number;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService
    ) {
        this.defaultHeaders = {
            'X-App-Source': 'nestjs-gateway',
            'X-Env': this.config.get<string>('NODE_ENV') || 'development',
        };

        this.retryCount = this.config.get<number>('http.retryCount') || 3;
        this.retryDelay = this.config.get<number>('http.retryDelay') || 1000;
    }

    /**
     * 支持智能识别 baseURL + path 或完整 URL 模式
     */
    private async request<T>(
        method: HttpMethod,
        baseURL: string | null,
        path: string,
        data?: any,
        options?: RequestOptions
    ): Promise<T> {
        const isFullUrl = /^https?:\/\//.test(path);
        const headers = {
            ...this.defaultHeaders,
            ...options?.headers,
        };

        let requestConfig: AxiosRequestConfig;

        if (isFullUrl) {
            // 完整 URL 模式
            requestConfig = {
                ...options?.config,
                method,
                url: path,
                headers,
                data,
            };
        } else {
            // baseURL + 相对 path 模式
            if (!baseURL) {
                throw new Error('baseURL is required when using relative path');
            }
            const cleanedBase = baseURL.trim().replace(/\/+$/, '');
            const cleanedPath = path.trim().replace(/^\/+/, '');
            requestConfig = {
                ...options?.config,
                method,
                baseURL: cleanedBase,
                url: `/${cleanedPath}`,
                headers,
                data,
            };
        }

        try {
            const response = await firstValueFrom(
                this.httpService.request<T>(requestConfig).pipe(
                    retry({
                        count: this.retryCount,
                        delay: () => timer(this.retryDelay),
                    }),
                    map((res: AxiosResponse<T>) => res.data),
                    catchError((error: AxiosError) => {
                        this.logger.error(
                            `HTTP ${method.toUpperCase()} ${requestConfig.url} failed`,
                            error.stack || error.message
                        );
                        if (error?.code === 'ECONNABORTED') {
                            throw new HttpException('Request timeout', HttpStatus.GATEWAY_TIMEOUT);
                        }
                        if (!error?.response) {
                            throw new HttpException('Service unavailable', HttpStatus.SERVICE_UNAVAILABLE);
                        }
                        throw new HttpException(
                            error.response.data || 'Remote service error',
                            error.response.status || HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                )
            );
            return response;
        } catch (error) {
            this.logger.error(
                `Final request failed: ${method.toUpperCase()} ${requestConfig.url}`,
                error.message
            );
            throw error;
        }
    }

    get<T>(baseURL: string | null, path: string, options?: RequestOptions) {
        return this.request<T>('get', baseURL, path, null, options);
    }

    post<T>(baseURL: string | null, path: string, body: any, options?: RequestOptions) {
        return this.request<T>('post', baseURL, path, body, options);
    }

    put<T>(baseURL: string | null, path: string, body: any, options?: RequestOptions) {
        return this.request<T>('put', baseURL, path, body, options);
    }

    delete<T>(baseURL: string | null, path: string, options?: RequestOptions) {
        return this.request<T>('delete', baseURL, path, null, options);
    }

    create(baseURL: string) {
        const cleanedBase = baseURL?.trim().replace(/\/+$/, '');
        if (!cleanedBase) {
            throw new Error('HttpClientService.create(): baseURL is required');
        }

        return {
            get: <T>(path: string, options?: RequestOptions) =>
                this.request<T>('get', cleanedBase, path, null, options),
            post: <T>(path: string, body: any, options?: RequestOptions) =>
                this.request<T>('post', cleanedBase, path, body, options),
            put: <T>(path: string, body: any, options?: RequestOptions) =>
                this.request<T>('put', cleanedBase, path, body, options),
            delete: <T>(path: string, options?: RequestOptions) =>
                this.request<T>('delete', cleanedBase, path, null, options),
        };
    }
}

export default HttpClientService;