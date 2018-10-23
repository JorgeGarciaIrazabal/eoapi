import React, { ComponentType } from 'react'

interface ResponseProps {
  status: string | number,
  body?: ComponentType<{}>,
}

const Response = (props: ResponseProps) => (
  <eoapi-response {...props} />
)

export default Response
