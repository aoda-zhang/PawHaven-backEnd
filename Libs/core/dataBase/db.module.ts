import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { DBNames } from '@shared/constants/constant'

@Module({})
class DatabaseModule {
    /**
     * dynamic Mongoose connection
     * @param dbConnectionKeys db connection keys from config
     */
    static forRoot(dbConnectionKeys: string[]): DynamicModule {
        const isMultipleDB = dbConnectionKeys?.length > 1
        const connectionProviders = dbConnectionKeys?.map((key) => ({
            connectionName: DBNames?.[key],
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const dbConnection = configService.get<Record<string, any>>(key)
                if (!dbConnection) {
                    throw new Error(`Database connection string for key "${key}" not found.`)
                }
                return { ...dbConnection }
            },
            inject: [ConfigService]
        }))

        const DBConnection = connectionProviders.map((provider) =>
            MongooseModule.forRootAsync({
                // Must clearfy each DB name if there is multiple DB connections
                connectionName: isMultipleDB ? provider?.connectionName : null,
                useFactory: provider.useFactory,
                inject: provider.inject
            })
        )

        return {
            module: DatabaseModule,
            imports: [ConfigModule, ...DBConnection],
            exports: [...DBConnection]
        }
    }
}
export default DatabaseModule
