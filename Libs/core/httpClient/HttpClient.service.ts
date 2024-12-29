import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'

@Injectable()
export default class HttpClientService {
    constructor(private readonly httpService: HttpService) {}

    async get(url: string, data: any = {}, customConfig: AxiosRequestConfig = {}) {
        return this.httpService.get(url, { params: data, ...customConfig })
    }

    async post(url: string, data: any = {}, customConfig: AxiosRequestConfig = {}) {
        return this.httpService.post(url, data, customConfig)
    }

    async put(url: string, data: any = {}, customConfig: AxiosRequestConfig = {}) {
        return this.httpService.put(url, data, customConfig)
    }

    async delete(url: string, data: any = {}, customConfig: AxiosRequestConfig = {}) {
        return this.httpService.delete(url, { params: data, ...customConfig })
    }
}
