import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
// import { PDFController } from './PDF.controller'
// import { HistoryService } from './PDF.service'

@Module({
    // imports: [MongooseModule.forFeature([{ name: DBCollection.HISTORY, schema: HistorySchema }])],
    controllers: [],
    providers: [],
    exports: []
})
export default class FileModule {}
