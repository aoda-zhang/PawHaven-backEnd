import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MicroServiceNames, MSClientNames } from '@shared/constants/constant'
import DocumentMessagePattern from '@shared/constants/MSMessagePatterns/document.messagePattern'
import CreatePDFDTO from '@shared/DTO/Document/create-PDF.DTO'
import { Response } from 'express'
import { firstValueFrom } from 'rxjs'

@Controller(MicroServiceNames.DOCUMENT)
export class DocumentController {
    constructor(@Inject(MSClientNames.MS_DOCUMENT) private readonly documentService: ClientProxy) {}

    @Post('/pdf/:fileId')
    async uploadDocument(@Res() res: Response, @Body() body: CreatePDFDTO) {
        const PDFData = await firstValueFrom(
            this.documentService.send(DocumentMessagePattern.GET_DOCUMENT_BY_ID, body)
        )
        const PDFContent = Buffer.from(PDFData?.data?.data)
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${PDFData?.fileName}`
        })
        res.end(PDFContent)
    }
}
