import { Component, ComponentType } from 'react'

interface PropertyProps {
  array?: boolean,
  name: string,
  type?: 'string' | 'number' | ComponentType<{}>,
  format?: 'email'
}

export default class Property extends Component<PropertyProps> {
}
