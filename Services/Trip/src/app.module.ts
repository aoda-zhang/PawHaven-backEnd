import { Module } from '@nestjs/common'
import { DestinationModule } from 'apps/Trip/modules/Destination/destination.module'
import HistoryModule from 'apps/Trip/modules/History/history.module'
import { UserModule } from '../shared/modules/User/user.module'
import { AuthModule } from '../shared/modules/Auth/auth.module'
import { ACLModule } from '../shared/modules/ACL/acl.module'

@Module({
    imports: [DestinationModule, HistoryModule, UserModule, AuthModule, ACLModule],
    providers: []
})
export class AppModule {}
