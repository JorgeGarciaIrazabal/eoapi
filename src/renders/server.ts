import {ReactElement} from 'react'
import {ServerProps} from '../components/Server'
import {ServerVariableProps} from '../components/ServerVariable'
import {getChildrenArray} from '../selectors'

export interface ServerOutPut {
  url: string,
  description?: string,
  variables: any, // I don't know if the is possible to have a type with variable keys
}

export function renderServer(server: ReactElement<ServerProps>,
                             context: object = {}): { output: ServerOutPut, context: any } {
  const output = {
    url: server.props.url,
    description: server.props.description,
    variables: getChildrenArray(server).reduce(
      (obj: any, child: ReactElement<ServerVariableProps>) => {
        obj[child.props.name] = {
          enum: child.props.enum,
          default: child.props.default,
        }
        return obj
      }, {}),
  }
  return {output, context}
}
