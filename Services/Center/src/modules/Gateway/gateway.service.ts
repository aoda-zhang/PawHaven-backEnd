import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MicroServiceNames } from '@shared/constants/constant'
import HttpClientService from '@shared/core/httpClient/HttpClient.service'
import { AxiosRequestConfig } from 'axios'
import { Observable } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
@Injectable()
class GatewayService {
    constructor(
        private readonly httpClientService: HttpClientService,
        private readonly configService: ConfigService
    ) {}

    async forwardMSRequest({
        request,
        params
    }: { request: Request; params: Record<string, any> }): Promise<Observable<any>> {
        const targetRequestOptions = this.getTargetServiceRequestOptions(request)
        const targetUrl = this.getTargetServiceURL(request)
        if (!(targetRequestOptions && Object.keys(targetRequestOptions)?.length > 0 && targetUrl)) {
            throw new BadRequestException('Service not found')
        }
        switch (request?.method) {
            case 'POST':
                return this.httpClientService.post(targetUrl, request?.body, targetRequestOptions)

            case 'GET':
                return this.httpClientService.get(targetUrl, params, targetRequestOptions)

            case 'PUT':
                return this.httpClientService.put(targetUrl, request?.body, targetRequestOptions)

            case 'DELETE':
                return this.httpClientService.delete(targetUrl, params, targetRequestOptions)

            default:
                throw new Error(`Unsupported HTTP method: ${request?.method}`)
        }
    }

    private getTargetServiceRequestOptions(request: Request): AxiosRequestConfig {
        const serviceName = this.getTargetServiceName(request)?.toUpperCase()
        return {
            headers: {
                'x-service-name': serviceName,
                traceID: uuidv4()
            },
            baseURL: this.configService.get('microServiceConnections')?.[serviceName]?.baseURL
        }
    }
    private getTargetServiceName(request: Request): string | null {
        const gatewayPrefix = `/${this.configService.get('http.prefix')}`
        const currentUrl = request.url?.replace(gatewayPrefix, '')
        const path = currentUrl?.split('?')?.[0]
        const segments = path.split('/').filter((segment) => segment !== '')
        const serviceName = segments?.length > 0 ? segments?.[0] : null
        return serviceName
    }
    private getTargetServiceURL(request: Request): string | null {
        const gatewayPrefix = `/${this.configService.get('http.prefix')}`
        const currentUrl = request.url?.replace(gatewayPrefix, '')
        const path = currentUrl?.split('?')?.[0]
        const segments = path.split('/').filter((segment) => segment !== '')
        const serviceName = segments?.length > 0 ? segments?.[0] : null
        if (MicroServiceNames?.[serviceName]) {
            return
        }
        return null
    }
    // 动态注册微服务
    // 根据 name 获取正确的 请求
    // 每个微服务中验证请求是否合法
}
export default GatewayService
