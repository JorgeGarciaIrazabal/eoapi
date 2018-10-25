import React, {ComponentType} from 'react'

type Method = 'post' | 'POST' | 'get' | 'GET'

export interface EndpointProps {
  path: string,
  method?: Method,
  body?: ComponentType<{}>,
  children?: any,
}

const Endpoint = (props: EndpointProps) => (
  <div {...props} />
)

export default Endpoint
