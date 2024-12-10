export enum LoggerTypeEnum {
    info = 'info',
    error = 'error',
    warn = 'warn'
}
export type LogType = {
    currentEnv: 'dev' | 'prod'
    time: Date
    requestURL: string
    method: 'GET' | 'POST' | 'PUT'
    tracedID: string
    requestParam: {
        query: string
        params: string
        body: object
    }
    response: object
}
