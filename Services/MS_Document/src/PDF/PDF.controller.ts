import { Controller } from '@nestjs/common'
import CreatePDFDTO from './DTO/create-PDF.DTO'
import { MessagePattern, Payload } from '@nestjs/microservices'
import documentMessagePattern from '@shared/constants/MSMessagePatterns/document.messagePattern'
import { PDFService } from './PDF.service'

@Controller('pdf')
export default class PDFController {
    constructor(private readonly pdfService: PDFService) {}

    @MessagePattern(documentMessagePattern.GET_DOCUMENT_BY_ID)
    async generatePdf(@Payload() payload: CreatePDFDTO) {
        return await this.pdfService.generatePdf(payload.template, payload.PDFData)
    }
}
