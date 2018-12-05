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

export type mediaTypes =
  'application/json'
  | 'application/xml'
  | 'text/plain'
  | string

export type typeOptionsOrComponent = typeOptions | ComponentType<{}>

export type parameterInOptions = 'path' | 'query' | 'header' | 'cookie'

export type modelOptions = string | number | boolean | any[] | ComponentType<{}>

export interface ResponseOutput {
  type?: typeOptionsOrComponent,
  minimum?: number,
  maximum?: number,
  format?: formatOptions,
  enum?: string[],
}

export interface SchemaOutput extends ResponseOutput {
  default?: modelOptions,
}

export type SchemaType = SchemaOutput | ComponentType<{}>
