import UserInfoDTO from '@shared/models/userInfo.dto'
import { LocaleKeys } from './enum'

interface ExtendedHeader {
    user: UserInfoDTO
    locale: LocaleKeys
}
export type RequestHeader = Request & ExtendedHeader
