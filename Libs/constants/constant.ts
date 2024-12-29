import createMSName from '@shared/utils/createMSName'

export const MicroServiceNames = {
    TRIP: 'trip',
    DOCUMENT: 'document',
    AUTH: 'auth'
}

// microservice names when using microservice client
export const MSClientNames = {
    [createMSName(MicroServiceNames.TRIP)]: createMSName(MicroServiceNames.TRIP),
    [createMSName(MicroServiceNames.DOCUMENT)]: createMSName(MicroServiceNames.DOCUMENT),
    [createMSName(MicroServiceNames.AUTH)]: createMSName(MicroServiceNames.AUTH)
}

// config keys from env config file
export const ConfigKeys = {
    DBConnections: 'DBConnections',
    MicroServices: 'MicroServices'
}

export const Versions = {
    v1: 'v1',
    v2: 'v2'
}

type VersionType = (typeof Versions)[keyof typeof Versions]
type MicroServiceNameType = (typeof MicroServiceNames)[keyof typeof MicroServiceNames]
export type MSMessagePatternType = {
    [key: string]: `${MicroServiceNameType}.${string}.${VersionType}`
}
