import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsObject, IsString } from 'class-validator'

export default class CreatePDFDTO {
    @ApiProperty({ description: 'PDF template' })
    @IsNotEmpty({ message: 'Template is requied' })
    @IsString()
    @Type(() => String)
    template: string

    @ApiProperty({ description: 'PDF data for generate PDF file' })
    @IsNotEmpty({ message: 'PDF data is required!' })
    @IsObject()
    PDFData: Record<string, any>
}
