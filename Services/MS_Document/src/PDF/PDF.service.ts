import { Injectable } from '@nestjs/common'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import puppeteer, { PDFOptions } from 'puppeteer'
import { ServerStyleSheet } from 'styled-components'
import CreatePDFDTO from '@shared/DTO/Document/create-PDF.DTO'
import convertImageToBase64 from '@shared/utils/convertImagToBase64'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PDFService {
    constructor(private readonly configService: ConfigService) {}
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

    async getHeaderFooter(payload: CreatePDFDTO) {
        const headerLogo = await convertImageToBase64(this.configService.get('PDF.headerLogo'))
        const headerTemplate = await this.getHTMLContent({
            template: 'common_header',
            PDFData: { logoUrl: headerLogo, ...(payload?.PDFHeaderData ?? {}) }
        })
        const footerTemplate = await this.getHTMLContent({
            template: 'common_footer',
            PDFData: { ...(payload?.PDFFooterData ?? {}) }
        })
        return {
            headerTemplate,
            footerTemplate
        }
    }

    async getPDFSettings(payload: CreatePDFDTO): Promise<PDFOptions> {
        try {
            const headerFooter = await this.getHeaderFooter(payload)
            const {
                format = 'A4',
                width = '100%',
                height = '100%',
                margin = {
                    top: '80px',
                    bottom: '80px',
                    left: '20px',
                    right: '20px'
                },
                displayHeaderFooter = true,
                headerTemplate = headerFooter?.headerTemplate,
                footerTemplate = headerFooter?.footerTemplate,
                preferCSSPageSize = true // Optionally use CSS page size
            } = payload?.PDFOptions ?? {}
            return {
                format,
                width,
                height,
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
                PDFData: payload?.PDFContentData
            })
            await page.setContent(PDFMainContent, {
                waitUntil: ['networkidle2', 'domcontentloaded']
            })
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
