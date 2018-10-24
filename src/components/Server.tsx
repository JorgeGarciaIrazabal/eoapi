import React, {ReactElement} from 'react'
import {ServerVariableProps} from './ServerVariable'

/**
 * defines the server options (replacing basePath)
 * check openapi documentation: https://swagger.io/docs/specification/api-host-and-base-path/
 */
export interface ServerProps {
  children?: Array<ReactElement<ServerVariableProps>>,
  url: string,
  description?: string
}

const Server = (props: ServerProps) => (
  <eoapi-server {...props} />
)

export default Server
