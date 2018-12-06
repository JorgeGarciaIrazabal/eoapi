import React, {ReactElement} from 'react'

interface ObjectProps {
  children?: Array<ReactElement<any>> | ReactElement<any>,
}

const OObject = (props: ObjectProps) => (
  <div {...props} />
)

export default OObject
