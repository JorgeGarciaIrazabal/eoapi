import React, {ReactElement} from 'react'
import {PropertyProps} from './Property'

interface ObjectProps {
  children?: Array<ReactElement<PropertyProps>>,
}

const OObject = (props: ObjectProps) => (
  <div {...props} />
)

export default OObject
