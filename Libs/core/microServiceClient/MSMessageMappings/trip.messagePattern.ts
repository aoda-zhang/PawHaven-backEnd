import { MSMessagePatternType, MicroServiceNames, Versions } from '@shared/constants/constant'

/*
// Please define the message pattern by the following format:
// 1: microservice name
// 2: specific message action name (CRUD)
// 3: Version (To clearfy different version of the same message)
    Example:
    GET_TRIP_LIST: `${MicroServiceNames.TRIP}.getTripList.${Versions.v1}`
*/

const TRIP_MESSAGE_PATTERN: MSMessagePatternType = {
    GET_TRIP_LIST1: `${MicroServiceNames.TRIP}.getTripList.${Versions.v1}`
}

export default TRIP_MESSAGE_PATTERN
