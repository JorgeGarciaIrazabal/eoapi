import React, { ReactElement } from 'react'
import { PropertyProps } from './Property'

interface ObjectProps {
  children?: Array<ReactElement<PropertyProps>>,
}

const OObject = (props: ObjectProps) => (
  <eoapi-object {...props} />
)

export default OObject
