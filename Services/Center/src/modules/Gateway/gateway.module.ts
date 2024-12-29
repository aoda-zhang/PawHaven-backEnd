import { Module } from '@nestjs/common'
import MS_DocumentController from './Document/document.controller'
import MS_TripController from './Trip/trip.controller'
@Module({
    imports: [],
    controllers: [MS_TripController, MS_DocumentController],
    providers: []
})
export class GatewayModule {}
