import { Injectable } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export type HMACParams = {
    request: Record<string, any>
    clientTimestamp: string
}
export type CompareHMACParams = HMACParams & {
    clientHMAC: string
}

@Injectable()
export class EncryptService {
    private privateKey: string

    private requestGap: number

    constructor(private readonly configService: ConfigService) {
        this.privateKey = this.configService.get<string>('auth.privateKey') ?? ''
        this.requestGap = this.configService.get<number>('auth.requestGap')
    }

    isTimestampAvailable = (clientTimestamp): boolean => {
        const serverUTCTimestamp = Math.floor(Date.now() / 1000)
        // 计算请求最小时间差值,防止请求重放攻击
        const isPassed =
            serverUTCTimestamp > 0 &&
            clientTimestamp > 0 &&
            serverUTCTimestamp >= clientTimestamp &&
            this.requestGap >= Math.abs(serverUTCTimestamp - clientTimestamp)
        return isPassed
    }

    private formatUrl = (url: string) => {
        return url
            .replace(this.configService.get<string>('http.prefix'), '')
            .replace(/\//g, '')
            ?.toLowerCase()
    }

    private generateHMAC = ({ request, clientTimestamp }: HMACParams): string => {
        const { body, url = '', method = '' } = request
        const requestBody = Object.keys(body ?? {})?.length > 0 ? JSON.stringify(request?.body) : ''
        return CryptoJS.HmacSHA256(
            `${this.formatUrl(url)}>${requestBody}+${method?.toUpperCase()}|${clientTimestamp}`,
            this.privateKey
        ).toString(CryptoJS.enc.Hex)
    }

    compareHMAC = ({ clientHMAC, request, clientTimestamp }: CompareHMACParams): boolean => {
        return clientHMAC === this.generateHMAC({ request, clientTimestamp })
    }
}
