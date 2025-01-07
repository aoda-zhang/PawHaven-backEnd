import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
// import { Logger } from 'nestjs-pino'

import initSwagger from '@shared/core/swagger'
import { EnvConstant } from '@shared/constants/constant'
import { AppModule } from './app.module'

const currentENV = process.env.NODE_ENV
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true
    })
    const corsOptions: CorsOptions = app.get(ConfigService).get('cors')
    app.enableCors(corsOptions)
    // app.useLogger(app.get(Logger))
    const prefix = app.get(ConfigService).get('http.prefix') ?? ''
    app.setGlobalPrefix(prefix)
    // Version control like v1 v2
    app.enableVersioning({
        type: VersioningType.URI
    })
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                return new BadRequestException(errors)
            }
        })
    )
    await initSwagger(app)
    app.use(helmet())
    const port = app.get(ConfigService).get('http.port') ?? 3000
    await app
        .listen(port, () => {
            ;[EnvConstant.dev, EnvConstant.uat]?.includes(currentENV?.toUpperCase()) &&
                console.log(`Successfully runing on local  http://localhost:${port}`)
        })
        .catch((error) => {
            console.error(`Running failed on local with error : ${error}`)
        })
}
bootstrap()
