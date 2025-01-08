import { Injectable } from '@nestjs/common'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import puppeteer, { PDFOptions } from 'puppeteer'
import { ServerStyleSheet } from 'styled-components'
import CreatePDFDTO from '@shared/DTO/Document/create-PDF.DTO'

@Injectable()
export class PDFService {
    getHTMLContent({ template, PDFData = {} }) {
        try {
            const styleSheet = new ServerStyleSheet()
            const { default: TemplateComponent } = require(`./templates/${template}`)
            const htmlContent = ReactDOMServer.renderToStaticMarkup(
                styleSheet.collectStyles(React.createElement(TemplateComponent, PDFData))
            )
            const styleTags = styleSheet.getStyleTags()
            return `<html lang="en"><head><meta charset="UTF-8" />${styleTags}</head><body>${htmlContent}</body></html>`
        } catch (error) {
            console.error(error)
            throw new Error(`get the ${template} with error: ${error}`)
        }
    }

    async getPDFSettings(payload: CreatePDFDTO): Promise<PDFOptions> {
        try {
            const commonHeader = await this.getHTMLContent({ template: 'common_header' })
            const commonFooter = await this.getHTMLContent({ template: 'common_footer' })
            const {
                format = 'A4',
                margin = {
                    top: '20mm',
                    bottom: '20mm',
                    left: '20mm',
                    right: '20mm'
                },
                displayHeaderFooter = true,
                headerTemplate = commonHeader,
                footerTemplate = commonFooter,
                preferCSSPageSize = true // Optionally use CSS page size
            } = payload?.PDFOptions ?? {}
            return {
                format,
                margin,
                displayHeaderFooter,
                headerTemplate,
                footerTemplate,
                preferCSSPageSize,
                ...(payload?.PDFOptions ?? {})
            }
        } catch (error) {
            console.error(error)
            throw new Error(`get PDF settings with error: ${error}`)
        }
    }

    async generatePDF(payload: CreatePDFDTO) {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            const PDFMainContent = await this.getHTMLContent({
                template: payload?.template,
                PDFData: payload?.PDFData
            })
            await page.setContent(PDFMainContent, { waitUntil: 'networkidle0' })
            const PDFSettings = await this.getPDFSettings(payload)
            const PDFBuffer = await page.pdf(PDFSettings)
            await browser.close()
            return {
                data: Buffer.from(PDFBuffer?.buffer),
                fileName: this.generatePDFFileName(payload)
            }
        } catch (error) {
            console.error(error)
            throw new Error(`${payload?.template} generate PDF with error: ${error}`)
        }
    }

    generatePDFFileName(payload: CreatePDFDTO) {
        return `${payload?.template}-${Date.now()}.pdf`
    }
}
