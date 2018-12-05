import {ReactElement} from 'react'

export function getChildrenArray(component: ReactElement<any>): Array<ReactElement<any>> {
  return Array.isArray(component.props.children) ?
    component.props.children :
    component.props.children ? [component.props.children] : []
}

function isNull(obj: any) {
  return typeof obj === 'object' && obj !== null
}

export function removeUndefined(obj: any) {
  if (Array.isArray(obj)) {
    obj = obj.map((item) => {
      return removeUndefined(item)
    })
    obj = obj.filter((item: any) => (item !== undefined))
  } else if (isNull(obj)) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && isNull(obj[key])) {
        obj[key] = removeUndefined(obj[key])
      }
      if (obj[key] === undefined || (Array.isArray(obj[key]) && obj[key].length === 0)) {
        delete obj[key]
      }
    })
    if (Object.keys(obj).length === 0) {
      return undefined
    }
  }
  return obj
}

export function extractSchemaFromProps(props: { [key: string]: any }) {
  return {
    type: props.type,
    minimum: props.minimum,
    maximum: props.maximum,
    default: props.default,
    format: props.format,
    enum: props.enum,
  }
}
