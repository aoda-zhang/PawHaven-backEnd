import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ResourceSchema } from '@shared/schemas/resource.schema'
import { RoleSchema } from '@shared/schemas/role.schema'
import { DBCollection } from 'src/schemas/DBcollection'

import ACLController from './ACLs.controller'
import ACLService from './ACLs.service'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DBCollection.ROLE, schema: RoleSchema },
            { name: DBCollection.RESOURCE, schema: ResourceSchema }
        ])
    ],
    controllers: [ACLController],
    providers: [ACLService],
    exports: [ACLService]
})
export default class ACLModule {}
