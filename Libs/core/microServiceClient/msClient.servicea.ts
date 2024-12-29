import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MSClientNames } from '@shared/constants/constant'

@Injectable()
export default class MSService {
    constructor(
        @Inject(MSClientNames.MS_TRIP)
        private readonly tripClient: ClientProxy,
        @Inject(MSClientNames.MS_DOCUMENT)
        private readonly documentClient: ClientProxy
    ) {}

    request(url: string, payload: Record<string, any>) {
        // 根据 url 来找出具体为那个 service
        // 传入 cmd 和 payload 调用
    }

    async invokeUserService(action: string, payload: any): Promise<any> {
        const cmd = `user.${action}` // 动态生成 cmd
        return this.documentClient.send({ cmd }, payload).toPromise() // 调用用户微服务
    }
}
