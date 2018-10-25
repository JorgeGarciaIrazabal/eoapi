import {ReactElement} from 'react'
import {APIProps} from '../components/API'
// import Server from '../components/Server'
// import Endpoint from '../components/Endpoint'

export function renderAPI(root: ReactElement<APIProps>, context?: { openapi?: string }): { apiJson: {}, context: {} } {
  // const servers: any[] = root.props.children.filter((child: any) => {
  //   return child.type === Server
  // })
  // const endpoints: any[] = root.props.children.filter((child: any) => {
  //   return child.type === Endpoint
  // })

  const apiJson = {
    openapi: (context && context.openapi) || '3.0.1',
    servers: [],
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
  return {apiJson, context: context || {}}
}
