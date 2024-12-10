import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export default class CreateDestinationDto {
    // 必选项描述
    @ApiProperty({ description: '目的地地址', default: '爱心宠物目的地' }) // 默认值设置
    @IsNotEmpty({ message: '目的地名称为必填项' })
    @IsString()
    @Type(() => String)
    @MinLength(2, { message: '目的地名称最小长度为2' })
    @MaxLength(10, { message: '目的地名称最大长度为20' })
    name: string

    @ApiProperty({ description: '是否需要移除', default: false })
    // 可选值
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isRemove = false
}
