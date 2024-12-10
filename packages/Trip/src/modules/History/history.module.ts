import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import { HistorySchema } from '@shared/schemas/history.schema'

import { HistoryController } from './history.controller'
import { HistoryService } from './history.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: DBCollection.HISTORY, schema: HistorySchema }])],
    controllers: [HistoryController],
    providers: [HistoryService],
    exports: [HistoryService]
})
export default class HistoryModule {}
