import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigKeys } from '@shared/constants/constant'
@Module({})
class DatabaseModule {
    /**
     * dynamic Mongoose connection
     * @param configValues All the config values from config file
     */
    static forRoot({ configValues }: { configValues: Record<string, any> }): DynamicModule {
        try {
            const availableDBConnections = configValues?.[ConfigKeys.DBConnections]
                ?.filter((item) => item?.enable)
                ?.map((item) => item?.options)
            const isMultipleDB = availableDBConnections?.length > 1
            const connectionProviders = availableDBConnections?.map((DBItem) => ({
                connectionName: DBItem,
                useFactory: () => {
                    return { ...(DBItem ?? {}) }
                }
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
        } catch (error) {
            throw new Error(`DB connection error :${error}`)
        }
    }
}
export default DatabaseModule
