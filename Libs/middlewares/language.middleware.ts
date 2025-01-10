import { Injectable, type NestMiddleware } from '@nestjs/common'
import { HttpReqHeader } from '@shared/core/httpClient/interface'
import type { NextFunction, Request, Response } from 'express'
import i18n from '../../i18n/i18n.config'
@Injectable()
export class LanguageMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: NextFunction) {
        const currentLang = req.headers[HttpReqHeader.locale] ?? 'en'
        i18n.setLocale(currentLang as string)
        next()
    }
}
