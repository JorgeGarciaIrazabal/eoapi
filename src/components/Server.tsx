import React, {ReactElement} from 'react'
import {ServerVariableProps} from './ServerVariable'

/**
 * defines the server options (replacing basePath)
 * check openapi documentation: https://swagger.io/docs/specification/api-host-and-base-path/
 */
export interface ServerProps {
  children?: Array<ReactElement<ServerVariableProps>> | ReactElement<ServerVariableProps>,
  url: string,
  description?: string
}

const Server = (props: ServerProps) => (
  <div {...props} />
)

export default Server
