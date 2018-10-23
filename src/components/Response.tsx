import { Component, ComponentType } from 'react'

interface ResponseProps {
  status: string | number,
  body?: ComponentType<{}>,
}

export default class Response extends Component<ResponseProps> {
}
