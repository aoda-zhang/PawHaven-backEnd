// No token verify route
import { SetMetadata } from '@nestjs/common'

const NoToken = () => SetMetadata('NO_TOKEN', true)
export default NoToken
