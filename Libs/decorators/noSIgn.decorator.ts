// No need Sign validation
import { SetMetadata } from '@nestjs/common'
import { Decorators } from '../constants/enum'
const NoSign = () => SetMetadata(Decorators.noSign, true)
export default NoSign
