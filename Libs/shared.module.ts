import { DynamicModule, Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import ConfigsModule from './core/configModule/configs.module'
import DatabaseModule from './core/dataBase/db.module'
import HttpExceptionFilter from './core/httpClient/httpExceptionFilter'
import HttpInterceptor from './core/httpClient/httpInterceptor'
import SpeedlimitModule from './core/speedlimit/speedlimit.module'
import MiddlewareModule from './middlewares/index.module'

interface SharedModuleOptions {
    // the env config file path, e.g.
    // const currentEnv = process.env.NODE_ENV ?? 'uat'
    // const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
    configFilePath: string
    // the config values from config file
    configValues?: Record<string, any>
    // the DB connection key in configs, multiple DB is support
    DBConnectKey?: string
    // the speed limit key in configs
    limitKey: string
    isIntergrateMiddware?: boolean
    isIntergrateHttpInterceptor?: boolean
    isIntergrateHttpExceptionFilter?: boolean
}
@Module({})
class SharedModule {
    static forRoot(options: SharedModuleOptions): DynamicModule {
        const {
            configFilePath,
            configValues,
            DBConnectKey,
            limitKey,
            isIntergrateMiddware = true,
            isIntergrateHttpExceptionFilter = true,
            isIntergrateHttpInterceptor = true
        } = options

        const getImports = () => {
            let imports = []
            if (configFilePath) {
                imports = [...imports, ConfigsModule.forRoot(configFilePath)]
            }
            // dynamic db connection
            imports = [...imports, DatabaseModule.forRoot({ DBConnectKey, configValues })]
            // speed limit
            if (limitKey) {
                imports = [...imports, SpeedlimitModule.forRoot(limitKey)]
            }
            // middleware
            if (isIntergrateMiddware) {
                imports = [...imports, MiddlewareModule]
            }
            return imports
        }

        const getProviders = () => {
            let providers: any[] = []
            if (isIntergrateHttpExceptionFilter) {
                // catch http error
                providers = [
                    ...providers,
                    {
                        provide: APP_FILTER,
                        useClass: HttpExceptionFilter
                    }
                ]
            }
            if (isIntergrateHttpInterceptor) {
                // catch http success
                providers = [
                    ...providers,
                    {
                        provide: APP_INTERCEPTOR,
                        useClass: HttpInterceptor
                    }
                ]
            }

            return providers
        }
        return {
            module: SharedModule,
            imports: [ConfigsModule, ...(getImports() ?? [])],
            providers: getProviders()
        }
    }
}

export default SharedModule
