import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

class HistoryContentDto {
    @ApiProperty({ description: '出发时间' })
    @IsNotEmpty({ message: '出发时间为必填项' })
    @IsString()
    @Type(() => String)
    startTime: string

    @ApiProperty({ description: '出发地点' })
    @IsNotEmpty({ message: '出发地点为必填项' })
    @IsString()
    @Type(() => String)
    from: string

    @ApiProperty({ description: '到达地点' })
    @IsNotEmpty({ message: '到达地点为必填项' })
    @IsString()
    @Type(() => String)
    to: string

    @ApiProperty({ description: '驾驶时间' })
    @IsNotEmpty({ message: '驾驶时间为必填项' })
    @IsString()
    @Type(() => String)
    spendTime: string

    @ApiProperty({ description: '总里程' })
    @IsNotEmpty({ message: '总里程为必填项' })
    @IsString()
    @Type(() => String)
    allMileage: string
}
export default class CreateHistoryDto {
    @ApiProperty({ description: '报销日期' })
    @IsNotEmpty({ message: '报销日期为必填项' })
    spendDate: string

    @ApiProperty({ description: '报销内容' })
    @IsNotEmpty({ message: '报销内容为必填项' })
    mapInfo: HistoryContentDto[]

    @ApiProperty({ description: '是否需要移除', default: false })
    // 可选值
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isRemove = false
}
