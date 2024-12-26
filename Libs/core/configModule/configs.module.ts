import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import getConfigValues from '@shared/utils/getConfigValues'

@Module({})
class ConfigsModule {
    /**
     * dynamic configration
     * @param configFilePath config file path
     */
    static forRoot(configFilePath: string): DynamicModule {
        const configValues = getConfigValues(configFilePath)
        const DynamicConfigModule = ConfigModule.forRoot({
            load: [() => configValues],
            envFilePath: '.env',
            isGlobal: true,
            cache: true
        })

        return {
            module: ConfigsModule,
            imports: [ConfigModule, DynamicConfigModule],
            exports: [DynamicConfigModule]
        }
    }
}
export default ConfigsModule
