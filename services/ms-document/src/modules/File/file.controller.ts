import { Controller, Get, Param } from '@nestjs/common'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Get('/v1/default-trip-views/:locale')
    getTrip(@Param('locale') locale: string) {
        return this.fileService.getTripDefaultViews(locale)
    }
}
