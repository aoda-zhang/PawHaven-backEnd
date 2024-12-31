import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MSClientNames, MicroServiceNames } from '@shared/constants/constant'
import TRIP_MESSAGE_PATTERN from '@shared/core/microServiceClient/MSMessageMappings/trip.messagePattern'
@Controller(MicroServiceNames.TRIP)
export class MS_TripController {
    constructor(@Inject(MSClientNames.MS_TRIP) private readonly tripService: ClientProxy) {}

    @Get('info/:id')
    getTrip(@Param('id') id: string) {
        return this.tripService.send(TRIP_MESSAGE_PATTERN.GET_TRIP_LIST1, {
            distination: 'Germany',
            startDate: '2024-01-01',
            endDate: '2024-01-01',
            id
        })
    }

    @Post('create')
    createTrip(@Body() body: Record<string, any>) {
        return this.tripService.send(TRIP_MESSAGE_PATTERN.CREATE_TRIP, body)
    }
}
