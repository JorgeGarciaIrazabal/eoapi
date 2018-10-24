import { ReactElement } from 'react'
import TestRenderer from 'react-test-renderer'

import Service, { ServiceProps } from './components/Service'
import Endpoint from './components/Endpoint'
import Parameter from './components/Parameter'
import Response from './components/Response'
import Object from './components/Object'
import Property from './components/Property'

export function render(root: ReactElement<ServiceProps>): any {
  const renderer = TestRenderer.create(root)

  return renderer.toJSON()
}

export {
  Service,
  Endpoint,
  Parameter,
  Response,
  Object,
  Property,
}
