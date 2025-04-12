import { Module } from '@nestjs/common'
import { MS_TripController } from './trip.controller'

@Module({
    imports: [],
    controllers: [MS_TripController],
    providers: []
})
export class TripModule {}
