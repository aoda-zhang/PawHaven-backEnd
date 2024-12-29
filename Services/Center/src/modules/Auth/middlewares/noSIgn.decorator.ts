// No need HMAC routes
import { SetMetadata } from '@nestjs/common'
const NoSign = () => SetMetadata('NO_SIGN', true)
export default NoSign
