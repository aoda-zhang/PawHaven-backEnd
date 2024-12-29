import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { MSClientNames, MicroServiceNames } from '@shared/constants/constant'
import TRIP_MESSAGE_PATTERN from '@shared/core/microServiceClient/MSMessageMappings/trip.messagePattern'
import { firstValueFrom } from 'rxjs'
@Controller(MicroServiceNames.TRIP)
class MS_TripController {
    constructor(@Inject(MSClientNames.MS_TRIP) private readonly tripService: ClientProxy) {}

    @Get('list')
    getTrip() {
        return firstValueFrom(
            this.tripService.send({ cmd: TRIP_MESSAGE_PATTERN.GET_TRIP_LIST1 }, {})
        )
    }
}
export default MS_TripController
