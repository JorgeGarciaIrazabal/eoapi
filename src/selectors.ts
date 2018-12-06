import {ReactElement} from 'react'
import {SchemaProperty, SchemaType} from './types'
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

function _extractSwaggerSchemaArray(
  schema: SchemaProperty,
  context: OeapiContext
): { schema: SchemaType, context: OeapiContext } {
  const {
    schema: newSchema,
    context: newContext,
  } = extractSwaggerSchema({
    ...schema,
    array: false,
  }, context)
  return {
    schema: {
      type: 'array',
      items: newSchema,
    },
    context: newContext,
  }
}

function _extractSwaggerProperty(
  schema: SchemaProperty,
  context: OeapiContext
): { schema: SchemaType, context: OeapiContext } {
  if (typeof schema.type === 'string') {
    if (schema.array) {
      return _extractSwaggerSchemaArray(schema, context)
    }
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
    if (schema.array) {
      return _extractSwaggerSchemaArray(schema, context)
    }
    return extractSwaggerSchema(schema.type as SchemaType, context)
  }
}

function _extractSwaggerReactComponent(
  props: SchemaType,
  context: OeapiContext
): { schema: SchemaType, context: OeapiContext } {
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
  newContext.outputObj.components.schemas[component.name] = {
    type: 'object',
    properties: finalProps,
  }
  return {schema: {$ref: '#/components/schemas/' + component.name}, context: newContext}
}

export function extractSwaggerSchema(
  props: SchemaType,
  context: OeapiContext
): { schema: SchemaType, context: OeapiContext } {
  const schema = props as SchemaProperty
  if (schema.type) {
    return _extractSwaggerProperty(schema, context)
  } else {
    return _extractSwaggerReactComponent(props, context)
  }
}
