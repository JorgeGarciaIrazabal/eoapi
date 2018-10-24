import {ReactElement} from 'react'
import TestRenderer from 'react-test-renderer'

import {APIProps} from '../components/API'

export function render(root: ReactElement<APIProps>): any {
  const renderer = TestRenderer.create(root)

  return renderer.toJSON()
}
