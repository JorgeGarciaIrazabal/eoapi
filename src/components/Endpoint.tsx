import { Component, ComponentType } from 'react'

type Method = 'post' | 'POST' | 'get' | 'GET'

interface EndpointProps {
  path: string,
  method?: Method,
  body?: ComponentType<{}>,
}

export default class Endpoint extends Component<EndpointProps> {
}
