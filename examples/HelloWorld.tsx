import React from 'react'
import {API, Endpoint, Object, Parameter, Property, Response, Server, ServerVariable} from '../src'

const WorkoutBasic = () => (
  <Object>
    <Property name="id" type="string" />
    <Property name="name" type="string" />
  </Object>
)

const UserDetails = () => (
  <Object>
    <Property name="id" type="string" />
    <Property name="email" type="string" format="email" />
  </Object>
)

const Pagination = () => (
  <Object>
    <Property name="page_index" type="number" />
    <Property name="page_size" type="number" />
    <Property name="total" type="number" />
  </Object>
)
const InsideProperties = () => (
  <>
    <Property name="items" array type={WorkoutBasic} />
    <Property name="pagination" type={Pagination} />
  </>
)

const WorkoutBasicList = () => (
  <Object>
    <InsideProperties />
  </Object>
)

const SignInRequest = () => (
  <Object>
    <Property name="email" type="string" format="email" />
    <Property name="password" type="string" />
  </Object>
)

const SignInResponse = () => (
  <Object>
    <Property name="user" type={UserDetails} />
    <Property name="token" type="string" />
  </Object>
)

// tslint:disable-next-line no-console
export default (
  <API
    title="eoapi"
    description="this is how you have to create api documentation!"
    version="0.1.1"
  >
    {/*
        Add servers to the API, this replace `base-path` on openAPI 3.0
        https://swagger.io/docs/specification/api-host-and-base-path/
      */}
    <Server url="{protocol}://{environment}.eoapi.com/v2">
      <ServerVariable name="protocol" default="https" enum={['http', 'https']} />
      <ServerVariable name="environment" default="dev" enum={['dev', 'prod', 'staging']} />
    </Server>
    <Endpoint path="/workouts" method="GET">
      <Response status="200" body={WorkoutBasicList} contentTypes={['application/json']} />
    </Endpoint>
    <Endpoint path="/workouts/{id}" method="GET">
      <Parameter in="path" name="id" type="string" description="this is great" />
      <Parameter in="path" name="aux" type="string" description="this is great" deprecated />
      <Response status="200" body={WorkoutBasicList} contentTypes={['application/json']} />
    </Endpoint>
    <Endpoint path="/sign-in" method="POST" body={SignInRequest}>
      <Response status="200" body={SignInResponse} contentTypes={['application/json']} />
    </Endpoint>
  </API>
)
