import React from 'react'
import {SchemaType} from '../types'

// docs: https://swagger.io/docs/specification/describing-responses/
export interface ResponseProps {
  status: string | number,
  description?: string,
  body?: SchemaType,
  // ignored if body is defined.
  oneOfBodies?: SchemaType[],
  contentTypes?: string[],
}

const Response = (props: ResponseProps) => (
  <div />
)

export default Response
