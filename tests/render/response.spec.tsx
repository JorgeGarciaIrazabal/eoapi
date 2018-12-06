import {expect} from 'chai'
import * as React from 'react'
import 'mocha'
import Response from '../../src/components/Response'
import {renderResponse} from '../../src/renders/response'
import {getEmptyContext} from '../../src/renders'

describe('Response render', () => {
  it('Response with body and description', () => {
    const response = (
      <Response
        status="200"
        body={{
          type: 'string',
        }}
        contentTypes={['application/json']}
        description="dd"
      />
    )
    const responseJson = renderResponse(response, getEmptyContext()).output['200']

    expect(responseJson.description).to.eq('dd')
    expect(responseJson.content).to.have.property('application/json')
    expect(responseJson.content).to.deep.equal({
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
  it('Response with oneOfBody', () => {
    const response = (
      <Response
        status="200"
        oneOfBodies={[
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ]}
        contentTypes={['application/json']}
        description="dd"
      />
    )
    const responseJson = renderResponse(response, getEmptyContext()).output['200']

    expect(responseJson.description).to.eq('dd')
    expect(responseJson.content).to.have.property('application/json')
    expect(responseJson.content).to.deep.equal({
      'application/json': {
        schema: {
          oneOf: [
            {
              default: undefined,
              enum: undefined,
              format: undefined,
              maximum: undefined,
              minimum: undefined,
              type: 'string',
            },
            {
              default: undefined,
              enum: undefined,
              format: undefined,
              maximum: undefined,
              minimum: undefined,
              type: 'number',
            },
          ],
        },
      },
    })
  })
})
