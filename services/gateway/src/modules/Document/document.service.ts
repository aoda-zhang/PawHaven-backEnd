import { Injectable } from '@nestjs/common'
import { MicroServiceNames } from '@shared/constants/constant'
import HttpClientService from '@shared/core/httpClient/HttpClient.service'

@Injectable()
export default class DocumentService {
    constructor(private http: HttpClientService) {}
    getDefaultTripViews = async (locale: string) => {
        return this.http.get(`${MicroServiceNames}/file/v1/default/${locale}`)
    }
}
