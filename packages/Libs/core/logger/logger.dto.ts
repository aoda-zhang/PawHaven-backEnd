import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsObject, IsString } from 'class-validator'

import { EnvConstant } from 'config'

export default class LoggerDTO {
    // 必选项描述
    @ApiProperty({ description: '当前运行环境', default: 'dev' }) // 默认值设置
    @IsEnum(EnvConstant)
    readonly currentEnv: EnvConstant

    @ApiProperty({ description: 'log记录时间' })
    readonly timestamp: string

    @ApiProperty({ description: '请求URL' })
    @IsString()
    readonly requestURL: string

    @ApiProperty({ description: '请求方法' })
    readonly method: string

    @ApiProperty({ description: 'log记录时间' })
    @IsObject()
    readonly requestHeaders: object

    @ApiProperty({ description: '响应状态' })
    @IsNumber()
    readonly responseStatus: number
}
