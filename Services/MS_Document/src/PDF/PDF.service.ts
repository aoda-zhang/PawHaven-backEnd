import { Injectable } from '@nestjs/common'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import puppeteer from 'puppeteer'
import { ServerStyleSheet } from 'styled-components'
import CreatePDFDTO from '@shared/DTO/Document/create-PDF.DTO'

@Injectable()
export class PDFService {
    async getPDFHTMLContent(PDFPayload: CreatePDFDTO) {
        const header = await this.getHTMLContent({ template: 'common_header' })
        const footer = await this.getHTMLContent({ template: 'common_footer' })
        const content = await this.getHTMLContent(PDFPayload)
        return {
            header: PDFPayload?.PDFOptions?.headerTemplate ?? header,
            footer: PDFPayload?.PDFOptions?.footerTemplate ?? footer,
            content
        }
    }
    getHTMLContent(PDFPayload: CreatePDFDTO) {
        try {
            const styleSheet = new ServerStyleSheet()
            const { default: TemplateComponent } = require(`./templates/${PDFPayload?.template}`)
            const htmlContent = ReactDOMServer.renderToStaticMarkup(
                styleSheet.collectStyles(
                    React.createElement(TemplateComponent, PDFPayload?.PDFData)
                )
            )
            const styleTags = styleSheet.getStyleTags()
            return `<html lang="en"><head><meta charset="UTF-8" />${styleTags}</head><body>${htmlContent}</body></html>`
        } catch (error) {
            console.error(error)
            throw new Error(`get the ${PDFPayload?.template} with error: ${error}`)
        }
    }

    async generatePDF(payload: CreatePDFDTO) {
        try {
            const {
                format = 'A4',
                margin,
                displayHeaderFooter,
                headerTemplate,
                footerTemplate
            } = payload?.PDFOptions ?? {}
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            // await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
            const PDFBuffer = await page.pdf({
                format,
                margin: margin ?? {
                    top: '20mm',
                    bottom: '20mm',
                    left: '20mm',
                    right: '20mm'
                },
                displayHeaderFooter: displayHeaderFooter ?? true,
                // headerTemplate: headerTemplate ?? commonHeader,
                // footerTemplate: footerTemplate ?? commonFooter,
                ...(payload?.PDFOptions ?? {})
            })
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
