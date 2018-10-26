// import {ReactElement} from 'react'
// import {OeapiContext} from './index'
// import {ResponseProps} from '../components/Response'

export interface ResponseOutput {
  [key: string]: { // de Status
    description?: string,
    // todo add headers support
    content?: any,
  }
}

// export function renderResponse(server: ReactElement<ResponseProps>,
//                                context?: OeapiContext): { output: ResponseOutput, context?: OeapiContext } {
//   const {props} = server
//
//   const output = {
//     in: props.in,
//     name: props.name,
//     required: props.required,
//     description: props.description,
//     deprecated: props.deprecated,
//     // if content is provided, the schema will be included in it
//     content: props.contentType ? {
//       [props.contentType]: {
//         schema,
//       },
//     } : undefined,
//     schema: props.contentType ? undefined : schema,
//     style: props.style, // doc: https://swagger.io/docs/specification/serialization/
//     explode: props.explode,
//     nullable: props.nullable,
//     allowEmptyValue: props.allowEmptyValue,
//     allowReserved: props.allowReserved,
//     example: props.example,
//   }
//   return {output, context}
// }
