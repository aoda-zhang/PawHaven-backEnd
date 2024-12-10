import { ValidationPipe, VersioningType } from '@nestjs/common'
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { Logger } from 'nestjs-pino'

import initSwagger from '@shared/core/swagger'

import { AppModule } from './app.module'

const currentENV = process.env.NODE_ENV
async function bootstrap() {
    // 业务service建议express
    // gateway 建议fastiy
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true
    })
    const corsOptions: CorsOptions = app.get(ConfigService).get('cors')
    app.enableCors(corsOptions)
    app.useLogger(app.get(Logger))
    const prefix = app.get(ConfigService).get('http.prefix') ?? ''
    app.setGlobalPrefix(prefix)
    // Version control like v1 v2
    app.enableVersioning({
        type: VersioningType.URI
    })
    app.useGlobalPipes(
        new ValidationPipe({
            // 自动转换定义的字段类型
            transform: true,
            // 清除dto中未定义的字段
            whitelist: true
        })
    )
    await initSwagger(app)
    app.use(helmet()) // 防止跨站脚本攻击等安全风险
    const port = app.get(ConfigService).get('http.port') ?? 3000
    await app
        .listen(port, () => {
            // eslint-disable-next-line no-unused-expressions
            currentENV === 'uat' && console.log(`本地开发运行在 http://localhost:${port}`)
        })
        .catch((error) => {
            console.error(`应用启动异常:${error}`)
        })
}
bootstrap()
