import { Component } from 'react'

interface ParameterProps {
  in: 'path' | 'query',
  name: string,
  type?: 'string' | 'number',
}

export default class Parameter extends Component<ParameterProps> {
}
