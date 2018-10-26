import {ReactElement} from 'react'
import {OeapiContext} from './index'
import {ParameterProps} from '../components/Parameter'
import {parameterInOptions, SchemaOutput} from '../types'
import {extractSchemaFromProps} from '../selectors'

export interface ParameterOutPut {
  in: parameterInOptions,
  name: string,
  required?: boolean,
  description?: string,
  deprecated?: boolean,
  // if content is provided, the schema will be included in it
  content?: { [key: string]: { schema: SchemaOutput } },
  schema?: SchemaOutput
  style?: string, // doc: https://swagger.io/docs/specification/serialization/
  explode?: boolean,
  nullable?: boolean,
  allowEmptyValue?: boolean,
  allowReserved?: boolean,
  example?: any,
}

export function renderParameter(server: ReactElement<ParameterProps>,
                                context?: OeapiContext): { output: ParameterOutPut, context?: OeapiContext } {
  const {props} = server

  // todo: need to handle parameter when type is and object

  const schema = extractSchemaFromProps(props)
  const output: ParameterOutPut = {
    in: props.in,
    name: props.name,
    required: props.required,
    description: props.description,
    deprecated: props.deprecated,
    // if content is provided, the schema will be included in it
    content: props.contentType ? {
      [props.contentType]: {
        schema,
      },
    } : undefined,
    schema: props.contentType ? undefined : schema,
    style: props.style, // doc: https://swagger.io/docs/specification/serialization/
    explode: props.explode,
    nullable: props.nullable,
    allowEmptyValue: props.allowEmptyValue,
    allowReserved: props.allowReserved,
    example: props.example,
  }
  return {output, context}
}
