import { Body, Controller, Post, Res } from '@nestjs/common'
import type { Response } from 'express'
import type CreatePDFDTO from './DTO/create-PDF.DTO'
import type PDFService from './PDF.service'

@Controller('PDF')
export default class PDFController {
    constructor(private readonly pdfService: PDFService) {}

    @Post('create')
    async generatePdf(@Body() generatePdfDto: CreatePDFDTO, @Res() res: Response) {
        const { template, PDFData } = generatePdfDto
        const pdfPath = await this.pdfService.generatePDF(template, PDFData)
        res.download(pdfPath, (err) => {
            if (err) {
                console.error('Error sending PDF file:', err)
            }
        })
    }
}
