import { DynamicModule, Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import ConfigsModule from './core/configModule/configs.module'
import DatabaseModule from './core/dataBase/db.module'
import HttpExceptionFilter from './core/http/httpExceptionFilter'
import HttpInterceptor from './core/http/httpInterceptor'
import MiddlewareModule from './core/middlewares/index.module'
import SpeedlimitModule from './core/speedlimit/speedlimit.module'

interface SharedModuleOptions {
    // the env config file path, e.g.
    // const currentEnv = process.env.NODE_ENV ?? 'uat'
    // const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
    confileFilePath: string
    // the DB connection key in configs, multiple DB is support
    DBConnectKey: `DB_${string}`[]
    isIntergrateSpeedLimit?: boolean
    isIntergrateMiddware?: boolean
    isIntergrateHttpInterceptor?: boolean
    isIntergrateHttpExceptionFilter?: boolean
}
@Module({})
class SharedModule {
    static forRoot(options: SharedModuleOptions): DynamicModule {
        const {
            confileFilePath,
            DBConnectKey,
            isIntergrateSpeedLimit = true,
            isIntergrateMiddware = true,
            isIntergrateHttpExceptionFilter = true,
            isIntergrateHttpInterceptor = true
        } = options

        const getImports = () => {
            let imports = []
            if (confileFilePath) {
                imports = [...imports, ConfigsModule.forRoot(confileFilePath)]
            }
            if (DBConnectKey) {
                imports = [...imports, DatabaseModule.forRoot(DBConnectKey)]
            }
            if (isIntergrateSpeedLimit) {
                imports = [...imports, SpeedlimitModule]
            }
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
            imports: getImports(),
            providers: getProviders()
        }
    }
}

export default SharedModule
