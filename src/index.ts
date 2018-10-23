import { ReactElement } from 'react'
import Service from './components/Service'
import Endpoint from './components/Endpoint'
import Parameter from './components/Parameter'
import Response from './components/Response'
import Object from './components/Object'
import Property from './components/Property'

export function render(root: ReactElement<Service>): any {
  // noop
  return {}
}

export {
  Service,
  Endpoint,
  Parameter,
  Response,
  Object,
  Property,
}
