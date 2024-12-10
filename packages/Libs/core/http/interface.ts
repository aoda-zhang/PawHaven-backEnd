export interface HttpResType {
    isSuccess: boolean
    message: string
    data: unknown
    status: number
}
export enum HttpBusinessCode {
    // jwt 过期
    jwtexpired = 'jwtexpired',
    invalidToken = 'invalidtoken'
}
export enum HttpReqHeader {
    timestamp = 'x-timestamp',
    apiKey = 'x-api-key',
    traceID = 'traceID',
    accessToken = 'access-token',
    locale = 'locale'
}

export enum HttpBusinessMappingCode {
    // jwt 过期
    jwtexpired = 'E4001'
}
