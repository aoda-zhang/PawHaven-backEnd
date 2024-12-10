// No token verify route
import { SetMetadata } from '@nestjs/common'

import Decorators from './decorators.enum'

const NoToken = () => SetMetadata(Decorators.noToken, true)
export default NoToken
