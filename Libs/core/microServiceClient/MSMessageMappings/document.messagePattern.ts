import { MSMessagePatternType, MicroServiceNames, Versions } from '@shared/constants/constant'
/*
// Please define the message pattern by the following format:
// 1: microservice name
// 2: specific message action name (CRUD)
// 3: Version (To clearfy different version of the same message)
    Example:
    GET_DOCUMENT_LIST: `${MicroServiceNames.DOCUMENT}.getDocumentList.${Versions.v1}`
*/

const DOCUMENT_MESSAGE_PATTERN: MSMessagePatternType = {
    GET_DOCUMENT_LIST1: `${MicroServiceNames.DOCUMENT}.getDocumentList.${Versions.v1}`
}

export default DOCUMENT_MESSAGE_PATTERN
