import React, {ComponentType} from 'react'

type Method = 'post' | 'POST' | 'get' | 'GET' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'head' | 'HEAD'

export interface EndpointProps {
  path: string,
  method: Method,
  body?: ComponentType<{}>,
  children?: any,
  description?: string,
  summary?: string,
}

const Endpoint = (props: EndpointProps) => (
  <div {...props} />
)

export default Endpoint
