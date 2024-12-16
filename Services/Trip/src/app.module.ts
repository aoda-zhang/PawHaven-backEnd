import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import getConfigs from './config'
import SharedModule from '@shared/shared.module'
import setDBConnection from '@shared/utils/setDBConnection'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [getConfigs],
            envFilePath: '.env',
            isGlobal: true,
            cache: true
        }),
        setDBConnection('DB_TRIP'),
        SharedModule
    ],
    providers: []
})
export class AppModule {}
