import { Controller, Get, Headers } from '@nestjs/common'
import { MicroServiceNames } from '@shared/constants/constant'
import DocumentService from './document.service'

@Controller(MicroServiceNames.DOCUMENT)
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Get('/v1/default-trip-views')
    async getDefaultTripViews(@Headers('locale') locale: string) {
        return await this.documentService.getDefaultTripViews(locale)
    }
}
