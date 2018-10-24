import React from 'react'
import { Service, Endpoint, Parameter, Response, Object, Property, render } from '../src'

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
  render((
    <Service>
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
    </Service>
  ))
)
