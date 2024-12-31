import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, Transport } from '@nestjs/microservices'
import { MicroServiceNames } from '@shared/constants/constant'
import TRIP_MESSAGE_PATTERN from '@shared/core/microServiceClient/MSMessageMappings/trip.messagePattern'
import { TripService } from './trip.service'

@Controller(MicroServiceNames.TRIP)
export class TripController {
    constructor(private readonly tripService: TripService) {}

    @MessagePattern(TRIP_MESSAGE_PATTERN.GET_TRIP_LIST1)
    getTrip(@Payload() payload: Record<string, any>) {
        return this.tripService.getTripInfo(payload)
    }

    @MessagePattern(TRIP_MESSAGE_PATTERN.CREATE_TRIP)
    createTrip(@Payload() payload: Record<string, any>) {
        return this.tripService.createTrip(payload)
    }
}
