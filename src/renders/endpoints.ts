import {ReactElement} from 'react'
import {getChildrenArray} from '../selectors'
import {OeapiContext} from './index'
import {EndpointProps} from '../components/Endpoint'
import {ResponseProps} from '../components/Response'
import {renderResponse} from './response'
import {Response} from '../'

export interface ServerOutPut {
  [key: string]: { // path
    [key: string]: { // method
      description?: string,
      summary?: string,
      responses?: any,
      parameters?: any,
    },
  }
}

export function renderEndpoint(
  endpoint: ReactElement<EndpointProps>,
  context: OeapiContext
): { output: ServerOutPut, context: OeapiContext } {
  const responses: any[] = getChildrenArray(endpoint).filter((child: any) => {
    return child.type === Response
  })
  let newContext = {...context}
  const endpointOutput = {
    [endpoint.props.path]: {
      [endpoint.props.method.toLowerCase() as string]: {
        description: endpoint.props.description,
        summary: endpoint.props.summary,
        responses: responses.reduce(
          (obj: any, response: ReactElement<ResponseProps>) => {
            const {output, context: subNewContext} = renderResponse(response, context)
            newContext = subNewContext
            return {
              ...obj,
              ...output,
            }
          }, {}),
      },
    },
  }
  return {output: endpointOutput, context: newContext}
}
