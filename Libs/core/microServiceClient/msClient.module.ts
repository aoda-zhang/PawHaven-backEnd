import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigKeys, MSClientNames } from '@shared/constants/constant'
import getTransport from '@shared/utils/getTransport'

@Global()
@Module({})
class MSClientModule {
    static register(microServiceNames: string[]): DynamicModule {
        const isServiceNameAvailable = (microServiceNames: string[]) => {
            if (!microServiceNames) {
                throw new Error('Microservice names are required')
            }
            return microServiceNames?.some((name) => {
                if (!Object.values(MSClientNames)?.includes(name)) {
                    throw new Error('Microservice name is not available')
                }
                return true
            })
        }
        try {
            if (isServiceNameAvailable(microServiceNames)) {
                const microServices = microServiceNames?.map((name) => {
                    return {
                        name: name,
                        imports: [ConfigModule],
                        useFactory: (configService: ConfigService) => {
                            const serviceOption = configService
                                .get(ConfigKeys.MicroServices)
                                ?.find((service) => service?.name === name && service?.enable)
                            return serviceOption
                                ? {
                                      transport: getTransport(serviceOption?.transport),
                                      options: serviceOption?.options
                                  }
                                : {}
                        },
                        inject: [ConfigService]
                    }
                })

                const miccoServiceClients = ClientsModule.registerAsync(microServices)

                return {
                    module: MSClientModule,
                    imports: [miccoServiceClients],
                    exports: [miccoServiceClients]
                }
            }
        } catch (error) {
            throw new Error(`Microservice registration failed with error: ${error}`)
        }
    }
}

export default MSClientModule
