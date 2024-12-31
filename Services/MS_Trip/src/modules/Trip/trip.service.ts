import { Injectable } from '@nestjs/common'

@Injectable()
export class TripService {
    getTripInfo(payload: Record<string, any>) {
        return payload
    }

    createTrip(payload: Record<string, any>) {
        return payload
    }
}
