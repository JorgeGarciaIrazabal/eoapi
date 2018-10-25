import {ReactElement} from 'react'
import {APIProps} from '../components/API'
import {renderServer, ServerOutPut} from './server'
import Server from '../components/Server'
import {getChildrenArray} from '../arrayFormatters'

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
                          context: { openapi?: string } = {}): { output: APIOutput, context: any } {
  const servers: any[] = getChildrenArray(root).filter((child: any) => {
    return child.type === Server
  })
  // const endpoints: any[] = root.props.children.filter((child: any) => {
  //   return child.type === Endpoint
  // })

  const output = {
    openapi: context.openapi || '3.0.1',
    servers: servers.map((server) => renderServer(server).output),
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
    paths: [],
  }
  return {output, context}
}
