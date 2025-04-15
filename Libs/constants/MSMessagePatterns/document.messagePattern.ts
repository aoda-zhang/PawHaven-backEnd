/*
// Please define the message pattern by the following format:
// 1: microservice name
// 2: specific message action name (CRUD)
// 3: Version (To clearfy different version of the same message)
    Example:
    GET_DOCUMENT_LIST: `${MicroServiceNames.DOCUMENT}.getDocumentList.${Versions.v1}`
*/

import { MicroServiceNames, Versions } from '../constant'

const DocumentMessagePattern = {
    GET_DOCUMENT_LIST1: `${MicroServiceNames.DOCUMENT}.getDocumentList.${Versions.v1}`,
    GET_DOCUMENT_BY_ID: `${MicroServiceNames.DOCUMENT}.getDocumentById.${Versions.v1}`,
    GENERATE_PDF: `${MicroServiceNames.DOCUMENT}.generatePdf.${Versions.v1}`
}

export default DocumentMessagePattern
