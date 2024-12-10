import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type ACLService from './ACLs.service'
import type ResourceDTO from './dto/resource.dto'
import type RoleUpdateDTO from './dto/role-update'
import type RoleDTO from './dto/role.dto'
import ACLPermissions from './middlewares/ACL.decorator'

@ApiTags('ACL module')
@Controller('ACL')
export default class ACLController {
    constructor(private ACL: ACLService) {}

    @Get('/role/permissions')
    getRolePermissions(@Req() req: { user: { roles: string[] } }) {
        return this.ACL.getRolePermissions(req?.user?.roles)
    }

    @ACLPermissions(['ROLE_ADD'])
    @Post('/role/add')
    addRole(@Body() role: RoleDTO) {
        return this.ACL.addRoles(role)
    }

    @ACLPermissions(['ROLE_UPDATE'])
    @Put('/role/update')
    updateRolePermission(@Body() roles: RoleUpdateDTO) {
        return this.ACL.updateRolePermission(roles)
    }

    @ACLPermissions(['RES_ADD'])
    @Post('/resource/add')
    addResource(@Body() resource: ResourceDTO | ResourceDTO[]) {
        return this.ACL.addResource(resource)
    }

    @ACLPermissions(['RES_UPDATE'])
    @Put('/resource/update')
    updateResourcePermission(@Body() resource: ResourceDTO) {
        return this.ACL.updateResourcePermission(resource)
    }
}
