import { Controller } from '@nestjs/common'
import { FileService } from './file.service'
import DocumentMessagePattern from '@shared/constants/MSMessagePatterns/document.messagePattern'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @MessagePattern(DocumentMessagePattern.GET_DEFAULT_TRIP_VIEWS)
    getTrip(@Payload() payload: Record<string, any>) {
        return this.fileService.getTripDefaultViews(payload?.locale)
    }
}
