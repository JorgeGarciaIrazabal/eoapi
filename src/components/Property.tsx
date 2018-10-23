import React, { ComponentType } from 'react'

export interface PropertyProps {
  array?: boolean,
  name: string,
  type?: 'string' | 'number' | ComponentType<{}>,
  format?: 'email'
}

const Property = (props: PropertyProps) => (
  <eoapi-property {...props} />
)

export default Property
