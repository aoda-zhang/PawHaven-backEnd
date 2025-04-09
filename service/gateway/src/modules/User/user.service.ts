import ACLService from '@modules/ACL/ACLs.service'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import CommonDBCollections from '@shared/models/common.DBcollection'
import { User } from '@shared/models/user.schema'
import { Model } from 'mongoose'

@Injectable()
class UserService {
    constructor(
        @InjectModel(CommonDBCollections.USER) private userModel: Model<User>,
        private ACL: ACLService
    ) {}

    async getUserInfo(userName: string) {
        try {
            const userInfo = await this.userModel.findOne({ userName })
            if (!userInfo) {
                throw new UnauthorizedException('用户不存在')
            }
            return userInfo
        } catch (error) {
            throw new UnauthorizedException(`${error?.message}`)
        }
    }

    addUserRoles = async (userID: string, roles: string[]) => {
        try {
            const isRoleExisting = await this.ACL.isRoleExisting(roles)
            if (isRoleExisting) {
                await this.userModel.findByIdAndUpdate(userID, { roles })
                return true
            }
            throw new BadRequestException('role NOT exising!!')
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
export default UserService
