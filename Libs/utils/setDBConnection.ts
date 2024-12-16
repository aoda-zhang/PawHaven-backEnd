import { MongooseModule, type MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

const setDBConnection = (connectionName: `DB_${string}`) => {
    return MongooseModule.forRootAsync({
        imports: [ConfigModule],
        connectionName,
        useFactory: (configService: ConfigService): MongooseModuleOptions => {
            const DBConnection = configService.get(connectionName)
            if (!DBConnection) {
                throw new Error(`Database URL not found for connection: ${connectionName}`)
            }
            return {
                uri: DBConnection?.url,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        },
        inject: [ConfigService]
    })
}
export default setDBConnection
