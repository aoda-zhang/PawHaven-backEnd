import * as fs from 'node:fs'
import * as path from 'node:path'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { renderToStream } from '@react-pdf/renderer'

@Injectable()
export default class PDFService {
    async generatePDF(template: string, PDFCpntent: Record<string, any>): Promise<string> {
        try {
            const { default: PDFTemplate } = await import(`./templates/${template}`)
            const PDFStream = await renderToStream(PDFTemplate(PDFCpntent))

            // 保存 PDF 到文件系统
            const outputPath = path.join(__dirname, `../../../pdfs/${template}-${Date.now()}.pdf`)
            const writeStream = fs.createWriteStream(outputPath)
            PDFStream.pipe(writeStream)
            await new Promise((resolve, reject) => {
                writeStream.on('finish', resolve)
                writeStream.on('error', reject)
            })
            return outputPath
        } catch (error) {
            console.error('Error generating PDF:', error)
            throw new InternalServerErrorException('Failed to generate PDF')
        }
    }
}
