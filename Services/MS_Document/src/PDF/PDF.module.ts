import { Module } from '@nestjs/common'
import PDFController from './PDF.controller'
import PDFService from './PDF.service'

@Module({
    // imports: [MongooseModule.forFeature([{ name: DBCollection.HISTORY, schema: HistorySchema }])],
    controllers: [PDFController],
    providers: [PDFService],
    exports: [PDFService]
})
export default class PDFModule {}
