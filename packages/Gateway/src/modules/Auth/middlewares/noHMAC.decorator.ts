// No need HMAC routes
import { SetMetadata } from '@nestjs/common'
const NoHMAC = () => SetMetadata('NO_HMAC', true)
export default NoHMAC
