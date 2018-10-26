import React from 'react'
import {modelOptions} from '../types'

// docs: https://swagger.io/docs/specification/describing-responses/
export interface ResponseProps {
  status: string | number,
  description?: string,
  body?: modelOptions,
  // ignored if body is defined.
  oneOfBodies?: modelOptions[],
  contentTypes?: string[],
}

const Response = (props: ResponseProps) => (
  <div />
)

export default Response
