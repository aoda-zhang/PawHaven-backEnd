import { Injectable } from '@nestjs/common'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import puppeteer from 'puppeteer'

@Injectable()
export class PDFService {
    getPDFHtmlContent(templateName: string, props: Record<string, any>) {
        try {
            const { default: TemplateComponent } = require(`./templates/${templateName}`)
            return ReactDOMServer.renderToStaticMarkup(
                React.createElement(TemplateComponent, props)
            )
        } catch (error) {
            console.error(error)
            throw new Error(`get the ${templateName} with error: ${error}`)
        }
    }

    async generatePDF(templateName: string, props: Record<string, any>) {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            const htmlContent = await this.getPDFHtmlContent(templateName, props)
            await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
            const PDFBuffer = (await page.pdf({ format: 'A4' })).buffer
            await browser.close()
            return Buffer.from(PDFBuffer)
        } catch (error) {
            console.error(error)
            throw new Error(`${templateName} generate PDF with error: ${error}`)
        }
    }
}
