import React from 'react'
import {API, Endpoint, Object, Parameter, Property, Response, Server, ServerVariable} from '../src'
import {renderToYaml} from '../src/renders'

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

const WorkoutBasicList = () => (
  <Object>
    <Property name="items" array type={WorkoutBasic} />
    <Property name="pagination" type={Pagination} />
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
console.log(
  renderToYaml((
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
        <ServerVariable name="protocol" default="https" enum={['httpdsd', 'https']} />
        <ServerVariable name="environment" default="prod" enum={['dev', 'prod', 'staging']} />
      </Server>
      <Endpoint path="/workouts">
        <Response status="200" body={WorkoutBasicList} />
      </Endpoint>
      <Endpoint path="/workouts/{id}">
        <Parameter in="path" name="id" type="string" />
        <Response status="200" body={WorkoutBasicList} />
      </Endpoint>
      <Endpoint path="/sign-in" method="POST" body={SignInRequest}>
        <Response status="200" body={SignInResponse} />
      </Endpoint>
    </API>
  ))
)
