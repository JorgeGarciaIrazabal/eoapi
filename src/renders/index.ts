import {ReactElement} from 'react'

import {APIProps} from '../components/API'
import {renderAPI} from './api'
import {safeDump} from 'js-yaml'

const removeUndefined = (obj: any) => {
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      removeUndefined(item)
    })
  } else {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        obj[key] = removeUndefined(obj[key])
      }
      if (obj[key] === undefined || (Array.isArray(obj[key]) && obj[key].length === 0)) {
        delete obj[key]
      }
    })
    if (Object.keys(obj).length === 0) {
      obj = undefined
    }
  }
  return obj
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
