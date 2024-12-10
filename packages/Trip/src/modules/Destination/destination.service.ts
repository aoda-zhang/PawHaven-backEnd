import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import type { Destination } from '@shared/schemas/destination.schema'
import { LocaleKeys } from '@shared/types/enum'

@Injectable()
export class DestinationService {
    constructor(
        @InjectModel(DBCollection.DESTINATION) private destinationModal: Model<Destination>
    ) {}
}
