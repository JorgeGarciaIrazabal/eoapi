import React, {ReactElement} from 'react'
import {EndpointProps} from './Endpoint'
import {ServiceProps} from './Service'

export interface APIProps {
  children?: Array<ReactElement<EndpointProps>> | Array<ReactElement<ServiceProps>>,
  description?: string,
  version?: string,
  title?: string,
  // todo consider using an object instead of contact_ prefix
  contact_name?: string
  contact_url?: string
  contact_email?: string
  license_name?: string
  license_url?: string
}

const API = (props: APIProps) => (
  <eoapi-api {...props} />
)

export default API
