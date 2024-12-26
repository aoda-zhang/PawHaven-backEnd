import { readFileSync } from 'node:fs'
import * as yaml from 'js-yaml'
const getConfigValues = (configFilePath: string) => {
    try {
        const yamlContent = readFileSync(configFilePath, 'utf8')
        if (Object.keys(yamlContent)?.length > 0) {
            return yaml.load(readFileSync(configFilePath, 'utf8')) as Record<string, any>
        }
        console.error('No config file exist！！！')
        return {}
    } catch (error) {
        console.error(`get config value error: ${error}`)
        return {}
    }
}
export default getConfigValues
