import * as fs from 'node:fs'
import * as path from 'node:path'

import { EnvConstant } from '@shared/constants/constant'
import * as yaml from 'js-yaml'

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
