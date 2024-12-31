import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { EnvConstant } from '@shared/utils/getConfigValues'
import getTransport from '@shared/utils/getTransport'
import helmet from 'helmet'
import { AppModule } from './app.module'
const currentENV = process.env.NODE_ENV
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true
    })
    const port = app.get(ConfigService).get('http.port') ?? 8081
    const microServiceOption = app.get(ConfigService).get('microService')

    app.connectMicroservice(
        {
            transport: getTransport(microServiceOption?.transport),
            options: {
                host: microServiceOption?.host,
                port: microServiceOption?.port
            }
        },
        { inheritAppConfig: true }
    )

    await app.startAllMicroservices()
    // Version control like v1 v2
    app.enableVersioning({
        type: VersioningType.URI
    })
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true
        })
    )
    app.use(helmet())

    await app
        .listen(port, () => {
            ;[EnvConstant.dev, EnvConstant.uat].includes(currentENV?.toUpperCase()) &&
                console.log(`Successfully run at http://localhost:${port}`)
        })
        .catch((error) => {
            console.error(`Application run failed with issue :${error}`)
        })
}
bootstrap()
