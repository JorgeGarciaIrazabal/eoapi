import {ReactElement} from 'react'
import {SchemaOutput, SchemaType} from './types'
import {OeapiContext} from './renders'

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

export function extractSwaggerSchema(
  props: SchemaType,
  context: OeapiContext
): { schema: SchemaType, context: OeapiContext } {
  const schema = props as SchemaOutput
  if (schema.type) {
    if (typeof schema.type === 'string') {
      return {
        schema: {
          type: schema.type,
          minimum: schema.minimum,
          maximum: schema.maximum,
          default: schema.default,
          format: schema.format,
          enum: schema.enum,
        },
        context,
      }
    } else {
      return extractSwaggerSchema(schema.type as SchemaType, context)
    }
  } else {
    const component = props as () => ReactElement<any>
    const propertyObjects = getChildrenArray(component())
    let newContext = {...context}
    const finalProps = propertyObjects.reduce(
      (obj: any, child: ReactElement<any>) => {
        const {schema: newSchema, context: subNewContext} = extractSwaggerSchema(child.props, context)
        newContext = subNewContext
        obj[child.props.name] = newSchema
        return obj
      }, {})
    newContext.outputObj.components[component.name] = {
      type: 'object',
      properties: finalProps,
    }
    return {schema: {$ref: '#/components/' + component.name}, context: newContext}
  }
}
