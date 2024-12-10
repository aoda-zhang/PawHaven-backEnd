import { Body, Controller, Logger, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import ACLPermissions from '@shared/decorators/ACL.decorator'

import type CreateHistoryDto from './dto/create-history.dto'
import type { HistoryService } from './history.service'

@ApiTags('destination module')
@Controller('history')
export class HistoryController {
    logger: Logger = new Loggr(HistoryController.name, { timestamp: true })

    constructor(private readonly historyService: HistoryService) {}
}
