// No need Sign validation
import { SetMetadata } from '@nestjs/common'
const NoSign = () => SetMetadata('NO_SIGN', true)
export default NoSign
