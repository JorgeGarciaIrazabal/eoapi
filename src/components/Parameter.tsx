import React from 'react'
import {formatOptions, modelOptions, parameterInOptions, typeOptionsOrComponent} from '../types'

// information about this props here: https://swagger.io/docs/specification/describing-parameters/
export interface ParameterProps {
  in: parameterInOptions,
  name: string,
  required?: boolean,
  description?: string,
  deprecated?: boolean,
  array?: boolean,
  type: typeOptionsOrComponent,
  contentType?: string,
  style?: string, // doc: https://swagger.io/docs/specification/serialization/
  explode?: boolean,
  minimum?: number,
  maximum?: number,
  default?: modelOptions,
  format?: formatOptions,
  enum?: string[],
  nullable?: boolean,
  allowEmptyValue?: boolean,
  allowReserved?: boolean,
  example?: any,
}

const Parameter = (props: ParameterProps) => (
  <div />
)

export default Parameter
