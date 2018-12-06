import {ReactElement} from 'react'
import {getEmptyContext, OeapiContext} from './index'
import {ResponseProps} from '../components/Response'
import {SchemaType} from '../types'
import {extractSwaggerSchema} from '../selectors'

export interface Content {
  [key: string]: {
    schema?: SchemaType | { oneOf: SchemaType[] },
  }
}

export interface ResponseOutput {
  [key: string]: { // Status
    description?: string,
    // todo add headers support
    content?: Content,
  }
}

export function renderResponse(
  response: ReactElement<ResponseProps>,
  context: OeapiContext = getEmptyContext()
): { output: ResponseOutput, context: OeapiContext } {
  const {props} = response
  const contents: Content = {}
  let newContext = {...context}

  if (props.body && props.contentTypes) {
    const body = props.body as SchemaType
    props.contentTypes.forEach((contentType: string) => {
      const {
        schema,
        context: subNewContext,
      } = extractSwaggerSchema(body, newContext)
      newContext = subNewContext
      contents[contentType] = {
        schema,
      }
    })
  } else if (props.oneOfBodies && props.contentTypes) {
    props.contentTypes.forEach((contentType: string) => {
      contents[contentType] = {
        schema: {
          oneOf: (props.oneOfBodies || []).map((body) => {
            const {
              schema,
              context: subNewContext,
            } = extractSwaggerSchema(body, newContext)
            newContext = subNewContext
            return schema
          }),
        },
      }
    })
  }

  const output = {
    [props.status]: {
      description: props.description,
      content: contents,
    },
  }
  return {output, context}
}
