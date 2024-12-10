import type { UserAccessInfo } from '@modules/User/dto/interface'

import type { LocaleKeys } from './enum'

interface ExtendedHeader {
    user: UserAccessInfo
    locale: LocaleKeys
}
export type RequestHeader = Request & ExtendedHeader
