// No need HMAC routes
import { SetMetadata } from '@nestjs/common'

import Decorators from './decorators.enum'

const NoHMAC = () => SetMetadata(Decorators.noHMAC, true)
export default NoHMAC
