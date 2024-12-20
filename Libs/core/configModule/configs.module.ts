import { readFileSync } from 'node:fs'
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as yaml from 'js-yaml'

@Module({})
class ConfigsModule {
    /**
     * dynamic configration
     * @param configFilePath config file path
     */
    static forRoot(configFilePath: string): DynamicModule {
        const getConfigValues = () => {
            try {
                const yamlContent = readFileSync(configFilePath, 'utf8')
                if (Object.keys(yamlContent)?.length > 0) {
                    return yaml.load(readFileSync(configFilePath, 'utf8')) as Record<string, any>
                }
                console.error('No config file exist！！！')
                return {}
            } catch (error) {
                console.error(`get config value error: ${error}`)
                return {}
            }
        }

        const DynamicConfigModule = ConfigModule.forRoot({
            load: [getConfigValues],
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
