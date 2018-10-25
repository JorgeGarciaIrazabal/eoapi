import {ReactElement} from 'react'

export function getChildrenArray(component: ReactElement<any>): Array<ReactElement<any>> {
  return Array.isArray(component.props.children) ?
    component.props.children :
    component.props.children ? [component.props.children] : []
}
