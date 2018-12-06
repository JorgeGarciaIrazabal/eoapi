import React from 'react'
import {SchemaProperty} from '../types'

export interface PropertyProps extends SchemaProperty {
  name: string,
}

const Property = (props: PropertyProps) => (
  <div />
)

export default Property
