import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MicroServiceNames, MSClientNames } from '@shared/constants/constant'
import DocumentMessagePattern from '@shared/constants/MSMessagePatterns/document.messagePattern'
import { Response } from 'express'
import { firstValueFrom } from 'rxjs'

@Controller(MicroServiceNames.DOCUMENT)
export class DocumentController {
    constructor(@Inject(MSClientNames.MS_DOCUMENT) private readonly documentService: ClientProxy) {}

    @Post('/pdf/:fileId')
    async uploadDocument(
        @Res() res: Response,
        @Body() body: { template: string; PDFData: Record<string, any> }
    ) {
        // pdf 模版
        // pdf 配置
        // pdf 数据
        // pdf 名字
        const PDFData = await firstValueFrom(
            this.documentService.send(DocumentMessagePattern.GET_DOCUMENT_BY_ID, body)
        )
        const PDFContent = Buffer.from(PDFData?.data)
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=document.pdf'
        })
        res.end(PDFContent)
    }
}
