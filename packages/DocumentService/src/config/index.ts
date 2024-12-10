import * as path from 'path'
import * as fs from 'fs'

import * as yaml from 'js-yaml'

export enum EnvConstant {
    dev = 'DEV',
    uat = 'UAT',
    test = 'TEST',
    prod = 'PROD'
}

const currentEnv = process.env.NODE_ENV ?? 'uat'

const getConfigs = () => {
    const configFileAbsolutePath = path.resolve(
        __dirname,
        `./${EnvConstant[currentEnv]}/env/index.yaml`
    )
    const configs = yaml.load(fs.readFileSync(configFileAbsolutePath, 'utf8'))
    return configs
}
export default getConfigs
