import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { ConfigKeys, EnvConstant } from '@shared/constants/constant'
import i18n from 'i18n'
const currentENV = process.env.NODE_ENV
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true
    })
    const microServiceOption = app.get(ConfigService).get(ConfigKeys.serviceOptions)

    app.connectMicroservice(
        {
            transport: microServiceOption?.transport ?? 0,
            options: {
                host: microServiceOption?.host,
                port: microServiceOption?.port
            }
        },
        // Apply the main app config to the microservice
        { inheritAppConfig: true }
    )

    await app.startAllMicroservices()
    // Initialize i18n
    app.use(i18n.init)

    // global service prefix
    const prefix = app.get(ConfigService).get('http.prefix') ?? ''
    app.setGlobalPrefix(prefix)

    // Version control like v1 v2
    app.enableVersioning({
        type: VersioningType.URI
    })

    // DTO pipe settings
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true
        })
    )

    // avoid attack
    app.use(helmet())

    const port = app.get(ConfigService).get('http.port') ?? 3000
    await app
        .listen(port, () => {
            // eslint-disable-next-line no-unused-expressions
            ;[EnvConstant.dev, EnvConstant.uat].includes(currentENV?.toUpperCase()) &&
                console.log(`MS_Document Running on local:  http://localhost:${port}`)
        })
        .catch((error) => {
            console.error(`MS_Document start error:${error}`)
        })
}
bootstrap()
