import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import HttpClientService from '@shared/core/httpClient/HttpClient.service'
import { HttpService } from '@nestjs/axios'

@Injectable()
export default class DocumentService {
    private readonly httpClient: ReturnType<HttpClientService['create']>
    constructor(
        private http: HttpClientService,
        private configService: ConfigService,
        private httpService: HttpService
    ) {
        this.httpClient = this.http.create(this.configService.get('documentService.baseURL'))
    }
    getDefaultTripViews = async () => {
        try {
            return await this.http.get(null, "http://ms-document-service-uat.fullstack-namespace-uat.svc.cluster.local/api/document/file/v1/default-trip-views")
            // return await this.httpService.get('http://ms-document-service-uat.fullstack-namespace-uat.svc.cluster.local/api/document/file/v1/default-trip-views')

        } catch (error) {
            throw new Error(`Error fetching default trip views: ${error}`)
        }
    }
}
