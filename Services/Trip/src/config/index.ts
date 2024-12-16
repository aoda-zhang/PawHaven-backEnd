import * as path from 'path'
import * as fs from 'fs'

import * as yaml from 'js-yaml'
import { EnvConstant } from '@shared/constants/constant'

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
