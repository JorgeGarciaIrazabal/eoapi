import {ReactElement} from 'react'
import {OeapiContext} from './index'
import {ResponseProps} from '../components/Response'
import {SchemaType} from '../types'
import {extractSchemaFromProps} from '../selectors'

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

export function renderResponse(response: ReactElement<ResponseProps>,
                               context?: OeapiContext): { output: ResponseOutput, context?: OeapiContext } {
  const {props} = response
  const contents: Content = {}

  if (props.body && props.contentTypes) {
    props.contentTypes.forEach((contentType: string) => {
      contents[contentType] = {
        schema: extractSchemaFromProps(props.body || {}),
      }
    })
  } else if (props.oneOfBodies && props.contentTypes) {
    props.contentTypes.forEach((contentType: string) => {
      contents[contentType] = {
        schema: {
          oneOf: (props.oneOfBodies || []).map((body) => {
            return extractSchemaFromProps(body || {})
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
