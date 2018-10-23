import {ReactElement} from 'react'
import TestRenderer from 'react-test-renderer'

import Service, {ServiceProps} from './components/Service'
import Endpoint from './components/Endpoint'
import Parameter from './components/Parameter'
import Response from './components/Response'
import Object from './components/Object'
import Property from './components/Property'
import API from './components/API'
import Server from './components/Server'
import ServerVariable from './components/ServerVariable'

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
  API,
  Server,
  ServerVariable,
}
