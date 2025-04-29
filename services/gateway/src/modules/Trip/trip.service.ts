import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { MSClientNames } from '@shared/constants/constant'
import { ClientProxy } from '@nestjs/microservices'
import tripMessagePattern from '@shared/constants/MSMessagePatterns/trip.messagePattern'
import TripInfoDTO from '@shared/DTO/Trip/tripInfo.DTO'

@Injectable()
export default class TripService {
    constructor(
        @Inject(MSClientNames.MS_TRIP)
        private readonly tripClient: ClientProxy
    ) {}

    addTrip(tripInfo: TripInfoDTO) {
        try {
            return this.tripClient.send(tripMessagePattern.ADD_TRIP, tripInfo)
        } catch (error) {
            console.error('Error adding trip:', error)
            throw new BadRequestException('Failed to add trip')
        }
    }
}
