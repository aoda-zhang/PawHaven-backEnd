import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MSClientNames, MicroServiceNames } from '@shared/constants/constant'
import tripMessagePattern from '@shared/constants/MSMessagePatterns/trip.messagePattern'
@Controller(MicroServiceNames.TRIP)
export class MS_TripController {
    constructor(@Inject(MSClientNames.MS_TRIP) private readonly tripService: ClientProxy) {}

    @Get('info/:id')
    getTrip(@Param('id') id: string) {
        // return this.tripService.send(tripMessagePattern.GET_TRIP_LIST1, {
        //     distination: 'Germany',
        //     startDate: '2024-01-01',
        //     endDate: '2024-01-01',
        //     id
        // })
        return `Trip ${id} is great`
    }

    @Post('create')
    createTrip(@Body() body: Record<string, any>) {
        return this.tripService.send(tripMessagePattern.CREATE_TRIP, body)
    }
}
