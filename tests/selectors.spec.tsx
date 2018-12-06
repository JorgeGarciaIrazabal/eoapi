import {expect} from 'chai'
import 'mocha'
import {extractSwaggerSchema, removeUndefined} from '../src/selectors'
import Object from '../src/components/Object'
import Property from '../src/components/Property'
import React from 'react'
import {getEmptyContext} from '../src/renders'

describe('RemoveUndefined', () => {
  it('object with undefined values in the root are removed', () => {
    const obj = {
      a1: undefined,
      a2: 123,
      a3: null,
    }
    expect(obj).to.have.property('a1')
    expect(obj).to.have.property('a2')
    expect(obj).to.have.property('a3')
    const clearedObj = removeUndefined(obj)
    expect(clearedObj).to.not.have.property('a1')
    expect(clearedObj).to.have.property('a2')
    expect(clearedObj).to.have.property('a3')
  })

  it('array with undefined are cleared', () => {
    const myList = [
      undefined,
      123,
      null,
    ]
    expect(myList).to.length(3)
    const clearedList = removeUndefined(myList)
    expect(clearedList).to.length(2)
    expect(clearedList[0]).to.eq(123)
    expect(clearedList[1]).to.eq(null)
  })

  it('Nested obj and arrays', () => {
    const myObj = {
      a1: undefined,
      a2: 123,
      a3: [
        undefined,
        123,
      ],
      a4: {
        a1: undefined,
        a3: [
          undefined,
          null,
        ],
      },
    }

    const clearedList = removeUndefined(myObj)
    expect(clearedList).to.eql({
      a2: 123,
      a3: [
        123,
      ],
      a4: {
        a3: [
          null,
        ],
      },
    })
  })
})

describe('extractSwaggerSchema', () => {
  it('object with multiple properties gets constructed', () => {
    const UserDetails = () => (
      <Object>
        <Property name="id" type="string" />
        <Property name="email" type="string" format="email" />
      </Object>
    )
    const {
      context,
      schema,
    } = extractSwaggerSchema(UserDetails, getEmptyContext())
    expect(schema).to.deep.equal({
      $ref: '#/components/UserDetails',
    })
    expect(removeUndefined(context.outputObj.components.UserDetails)).to.deep.equal({
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
    })
  })

  it('object with nested objects is extracted correctly', () => {
    const UserDetails = () => (
      <Object>
        <Property name="id" type="string" />
        <Property name="email" type="string" format="email" />
      </Object>
    )
    const SignInResponse = () => (
      <Object>
        <Property name="user" type={UserDetails} />
        <Property name="token" type="string" />
      </Object>
    )
    const {
      context,
      schema,
    } = extractSwaggerSchema(SignInResponse, getEmptyContext())
    expect(schema).to.deep.equal({
      $ref: '#/components/SignInResponse',
    })
    expect(context.outputObj.components.SignInResponse.properties.user).to.deep.equal({
      $ref: '#/components/UserDetails',
    })
    expect(removeUndefined(context.outputObj.components.UserDetails)).to.deep.equal({
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
    })
  })
})
