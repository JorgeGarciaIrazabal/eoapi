import {ReactElement} from 'react'

import {APIProps} from '../components/API'
import {renderAPI} from './api'
import {safeDump} from 'js-yaml'
import {removeUndefined} from '../selectors'

export interface OeapiContext {
  version: string,
  outputObj: { [key: string]: any } // todo: create an interface for this
  routPaths: string[],
}

export function getEmptyContext(): OeapiContext {
  return {
    version: '1.0.0',
    outputObj: {components: {}},
    routPaths: [],
  }
}

export function render(root: ReactElement<APIProps>): any {
  const {
    output,
  } = renderAPI(root)
  return removeUndefined(output)
}

export function renderToJson(root: ReactElement<APIProps>): string {
  const apiJson = render(root)
  return JSON.stringify(apiJson)
}

export function renderToYaml(root: ReactElement<APIProps>): string {
  const apiJson = render(root)
  return safeDump(apiJson, {
    styles: {
      '!!null': 'canonical', // dump null as ~
    },
  })
}
