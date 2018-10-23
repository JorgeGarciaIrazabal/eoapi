import React, {ReactElement} from 'react'
import {EndpointProps} from './Endpoint'
import {ServiceProps} from "./Service";

export interface APIProps {
  children?: Array<ReactElement<EndpointProps>> | Array<ReactElement<ServiceProps>>,
  description?: string,
  title?: string,
  // todo we need to add a lot more properties here
}

const API = (props: APIProps) => (
  <eoapi-api {...props} />
)

export default API
