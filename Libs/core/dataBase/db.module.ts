import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigKeys } from '@shared/constants/constant'
@Module({})
class DatabaseModule {
    /**
     * dynamic Mongoose connection
     * @param DBConnectKey db connection key from config
     * @param configValues All the config values from config file
     */
    static forRoot({
        DBConnectKey,
        configValues
    }: { DBConnectKey: string; configValues: Record<string, any> }): DynamicModule {
        try {
            const availableDBConnections = configValues?.[DBConnectKey ?? ConfigKeys.DBConnections]
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
