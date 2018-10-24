import React, { ReactElement } from 'react'
import { EndpointProps } from './Endpoint'

export interface ServiceProps {
  children?: Array<ReactElement<EndpointProps>>,
}

const Service = (props: ServiceProps) => (
  <eoapi-service {...props} />
)

export default Service
