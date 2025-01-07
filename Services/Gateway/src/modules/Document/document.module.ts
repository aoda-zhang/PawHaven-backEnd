import { Module } from '@nestjs/common'
import { DocumentController } from './document.controller'

@Module({
    imports: [],
    controllers: [DocumentController]
})
export class DocumentModule {}
