import { Component } from 'react'

type Method = 'post' | 'POST' | 'get' | 'GET'

interface EndpointProps {
  path: string,
  method?: Method,
}

export default class Endpoint extends Component<EndpointProps> {
}
