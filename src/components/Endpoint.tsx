import React, { ComponentType } from 'react'

type Method = 'post' | 'POST' | 'get' | 'GET'

export interface EndpointProps {
  path: string,
  method?: Method,
  body?: ComponentType<{}>,
  children?: any,
}

const Endpoint = (props: EndpointProps) => (
  <eoapi-endpoint {...props} />
)

export default Endpoint
