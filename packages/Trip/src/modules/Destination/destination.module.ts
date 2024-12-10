import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import { DestinationSchema } from '@shared/schemas/destination.schema'

import { HospitalController } from './destination.controller'
import { DestinationService } from './destination.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: DBCollection.DESTINATION, schema: DestinationSchema }])
    ],
    controllers: [HospitalController],
    providers: [DestinationService],
    exports: [DestinationService]
})
export class DestinationModule {}
