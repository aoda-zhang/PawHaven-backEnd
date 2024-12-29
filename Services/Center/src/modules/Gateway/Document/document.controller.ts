import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MSClientNames } from '@shared/constants/constant'
import { MicroServiceNames } from '@shared/constants/constant'
@Controller(MicroServiceNames.DOCUMENT)
class MS_DocumentController {
    constructor(@Inject(MSClientNames.MS_DOCUMENT) private readonly documentService: ClientProxy) {}

    @Get('/')
    getDocument() {
        return this.documentService.send({ cmd: 'getDocument' }, {})
    }
}
export default MS_DocumentController
