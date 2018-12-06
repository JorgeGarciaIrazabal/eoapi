import {ComponentType} from 'react'

export type formatOptions =
  'int32'
  | 'int64'
  | 'float'
  | 'double'
  | 'byte'
  | 'binary'
  | 'date'
  | 'date-time'
  | 'password'
  | 'email'
  | 'uuid'

export type typeOptions =
  'integer'
  | 'number'
  | 'string'
  | 'boolean'
  | 'array'

export type mediaTypes =
  'application/json'
  | 'application/xml'
  | 'text/plain'
  | string

export type typeOptionsOrComponent = typeOptions | ComponentType<{}>

export type parameterInOptions = 'path' | 'query' | 'header' | 'cookie'

export type modelOptions = string | number | boolean | any[] | ComponentType<{}>

export interface SchemaProperty {
  array?: boolean,
  type: typeOptionsOrComponent,
  minimum?: number,
  maximum?: number,
  format?: formatOptions,
  enum?: string[],
  default?: modelOptions,
  pattern?: string,
  items?: any
}

export type SchemaType = SchemaProperty | ComponentType<{}> | { $ref: string }
