import { Component, ReactElement } from 'react'
import Property from './Property'

interface ObjectProps {
  children?: Array<ReactElement<Property>>,
}

export default class OObject extends Component<ObjectProps> {
}
