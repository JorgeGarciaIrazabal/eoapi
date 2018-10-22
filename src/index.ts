import { ReactElement } from 'react'
import Service from './components/Service'
import Endpoint from './components/Endpoint'

export function render(root: ReactElement<Service>): any {
  // noop
  return {}
}

export {
  Service,
  Endpoint,
}
