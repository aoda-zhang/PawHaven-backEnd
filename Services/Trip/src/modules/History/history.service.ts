import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'

import type UserInfoDTO from '@modules/User/dto/userInfo.dto'
import { DBCollection } from '@shared/schemas/DBcollection'
import type { History } from '@shared/schemas/history.schema'

import type CreateHistoryDto from './dto/create-history.dto'

@Injectable()
export class HistoryService {
    constructor(@InjectModel(DBCollection.HISTORY) private HistoryModal: Model<History>) {}
}
