import React from 'react'

/**
 * defines the server variable options allowing having a default value and a list of choices (enum)
 * This component should only be used inside `Server` component
 */
export interface ServerVariableProps {
  name: string,
  default?: string,
  enum?: string[],
}

const ServerVariable = (props: ServerVariableProps) => {
  return (
    <div />
  )
}

export default ServerVariable
