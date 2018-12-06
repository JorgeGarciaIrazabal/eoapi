import {ReactElement} from 'react'
import {APIProps} from '../components/API'
import {renderServer, ServerOutPut} from './server'
import Server from '../components/Server'
import {getChildrenArray} from '../selectors'
import {getEmptyContext, OeapiContext} from './index'
import Endpoint from '../components/Endpoint'
import deepmerge from 'deepmerge'
import {renderEndpoint} from './endpoints'

// import Endpoint from '../components/Endpoint'

export interface APIOutput {
  openapi: string,
  servers?: ServerOutPut[],
  info: {
    description?: string,
    version: string,
    title: string,
    contact?: {
      name?: string,
      email?: string,
      url?: string,
    },
    license?: {
      name?: string,
      url?: string,
    },
  },
}

export function renderAPI(root: ReactElement<APIProps>,
                          context: OeapiContext = getEmptyContext()): { output: APIOutput, context: OeapiContext } {
  const servers: any[] = getChildrenArray(root).filter((child: any) => {
    return child.type === Server
  })
  const endpoints: any[] = getChildrenArray(root).filter((child: any) => {
    return child.type === Endpoint
  })
  let newContext = {...context}

  const apiOutput = {
    openapi: context.version || '3.0.1',
    servers: servers.map((server) => renderServer(server, context).output),
    info: {
      description: root.props.description,
      version: root.props.version,
      title: root.props.title,
      contact: {
        name: root.props.contact_name,
        email: root.props.contact_email,
        url: root.props.contact_url,
      },
      license: {
        name: root.props.license_name,
        url: root.props.license_url,
      },
    },
    paths: endpoints.reduce((obj: any, endpoint: any) => {
      const {output, context: subNewContext} = renderEndpoint(endpoint, newContext)
      newContext = subNewContext
      return deepmerge(obj, output)
    }, {}),
  }
  return {output: apiOutput, context: newContext}
}
