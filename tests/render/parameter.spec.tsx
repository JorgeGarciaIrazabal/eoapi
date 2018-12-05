import {expect} from 'chai'
import * as React from 'react'
import 'mocha'
import Parameter from '../../src/components/Parameter'
import {renderParameter} from '../../src/renders/parameter'

describe('Parameter render', () => {
  it('construct json with basic parameters', () => {
    const parameter = (
      <Parameter
        in="query"
        name="param1"
        type="string"
      />
    )
    const parameterJson = renderParameter(parameter).output
    expect(parameterJson.description).to.eq(undefined)
    expect(parameterJson.in).to.eq('query')
    expect(parameterJson.name).to.eq('param1')
  })

  it('construct json with context do not add schema at root', () => {
    const parameter = (
      <Parameter
        in="query"
        name="param1"
        contentType="application/json"
        type="string"
        description="this is great"
      />
    )
    const parameterJson = renderParameter(parameter).output
    expect(parameterJson.description).to.eq('this is great')
    expect(parameterJson.schema).to.eq(undefined)
    expect(parameterJson.content).to.deep.equal({
      'application/json': {
        schema: {
          default: undefined,
          enum: undefined,
          format: undefined,
          maximum: undefined,
          minimum: undefined,
          type: 'string',
        },
      },
    })
  })

  it('construct json with context do not add schema at root', () => {
    const parameter = (
      <Parameter
        in="query"
        name="param1"
        contentType="application/json"
        type="string"
        description="this is great"
      />
    )
    const parameterJson = renderParameter(parameter).output
    expect(parameterJson.description).to.eq('this is great')
    expect(parameterJson.schema).to.eq(undefined)
    expect(parameterJson.content).to.deep.equal({
      'application/json': {
        schema: {
          default: undefined,
          enum: undefined,
          format: undefined,
          maximum: undefined,
          minimum: undefined,
          type: 'string',
        },
      },
    })
  })
})
