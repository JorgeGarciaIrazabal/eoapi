import React, {ReactElement} from 'react'
import {EndpointProps} from './Endpoint'
import {ServiceProps} from './Service'

export interface APIProps {
  version: string,
  title: string,
  children: Array<ReactElement<ServiceProps | EndpointProps>>,
  description?: string,
  // todo consider using an object instead of contact_ prefix
  contact_name?: string
  contact_url?: string
  contact_email?: string
  license_name?: string
  license_url?: string
}

const API = (props: APIProps) => (
  <div {...props} />
)

export default API
