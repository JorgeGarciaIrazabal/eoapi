import React from 'react'

interface ParameterProps {
  in: 'path' | 'query',
  name: string,
  type?: 'string' | 'number',
}

const Parameter = (props: ParameterProps) => (
  <eoapi-parameter {...props} />
)

export default Parameter
