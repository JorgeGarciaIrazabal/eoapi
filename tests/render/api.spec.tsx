import {expect} from 'chai'
import * as React from 'react'
import 'mocha'
import API from '../../src/components/API'
import {render, renderToYaml} from '../../src/renders'
import Server from '../../src/components/Server'
import ServerVariable from '../../src/components/ServerVariable'
import Endpoint from '../../src/components/Endpoint'
import Response from '../../src/components/Response'
import Object from '../../src/components/Object'
import Property from '../../src/components/Property'

describe('Api render', () => {
  it('construct json with basic parameters', () => {
    const api = (
      <API
        title="this is a title"
        version="1.0.0"
      >
        {/*It needs a children*/}
        <Server url="my server" description="my description" />
      </API>
    )
    const apiJson = render(api)
    expect(apiJson).to.have.property('openapi')
    expect(apiJson.info.title).to.eq('this is a title')
    expect(apiJson.info.version).to.eq('1.0.0')
    expect(apiJson.info).to.not.have.property('description')
    expect(apiJson).to.not.have.property('contact')
    expect(apiJson).to.not.have.property('license')
  })

  it('construct json with nested contact and license', () => {
    const api = (
      <API
        title="this is a title"
        version="1.0.0"
        description="description"
        contact_name="name"
        contact_email="email"
        contact_url="url"
        license_name="Apache 2"
        license_url="https://test.com"
      >
        <Server url="my2 server" description="my description" />
      </API>
    )
    const apiJson = render(api)
    expect(apiJson.info.description).to.eq('description')
    expect(apiJson.info.contact).to.eql({name: 'name', url: 'url', email: 'email'})
    expect(apiJson.info.license).to.eql({name: 'Apache 2', url: 'https://test.com'})
  })

  it('complex example', () => {
    const WorkoutBasic = () => (
      <Object>
        <Property name="id" type="string" />
        <Property name="name" type="string" />
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
    const api = (
      <API
        title="this is a title"
        version="1.0.0"
        description="description"
        contact_name="name"
        contact_email="email"
        contact_url="url"
        license_name="Apache 2"
        license_url="https://test.com"
      >
        <Server url="{protocol}://{environment}.eoapi.com/v2">
          <ServerVariable name="protocol" default="https" enum={['http', 'https']} />
          <ServerVariable name="environment" default="dev" enum={['dev', 'prod', 'staging']} />
        </Server>
        <Endpoint path="/workouts" method="GET">
          <Response status="200" body={WorkoutBasicList} contentTypes={['application/json']} />
        </Endpoint>
      </API>
    )
    const apiJson = renderToYaml(api)
    console.log(apiJson)
    // expect(apiJson.info.description).to.eq('description')
    // expect(apiJson.info.contact).to.eql({name: 'name', url: 'url', email: 'email'})
    // expect(apiJson.info.license).to.eql({name: 'Apache 2', url: 'https://test.com'})
  })
})
