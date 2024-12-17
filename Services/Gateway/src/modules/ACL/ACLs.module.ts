import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ResourceSchema } from '@shared/models/resource.schema'
import { RoleSchema } from '@shared/models/role.schema'
import GatewayDBCollections from 'src/models/gateway.DBcollection'
import ACLController from './ACLs.controller'
import ACLService from './ACLs.service'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: GatewayDBCollections.ROLE, schema: RoleSchema },
            { name: GatewayDBCollections.RESOURCE, schema: ResourceSchema }
        ])
    ],
    controllers: [ACLController],
    providers: [ACLService],
    exports: [ACLService]
})
export default class ACLModule {}
