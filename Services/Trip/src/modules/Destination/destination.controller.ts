import { Body, Controller, Get, Logger, Param, Post, Put, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import ACLPermissions from '@shared/decorators/ACL.decorator'
import type { RequestHeader } from '@shared/types/interface'

import type { DestinationService } from './destination.service'

@ApiTags('destination module')
@Controller('destination')
export class HospitalController {
    logger: Logger = new Logger(HospitalController.name, { timestamp: true })

    constructor(private readonly destinationService: DestinationService) {}
}
