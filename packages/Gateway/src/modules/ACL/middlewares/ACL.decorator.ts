// ACL permission verifcation
import { SetMetadata } from '@nestjs/common'

import Decorators from './decorators.enum'

const ACLPermissions = (permissions: string[]) =>
    SetMetadata(Decorators.ACLPermissions, permissions)
export default ACLPermissions
