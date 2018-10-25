import {expect} from 'chai'
import * as React from 'react'
import 'mocha'
import API from '../../src/components/API'
import {render} from '../../src/renders'
import Server from '../../src/components/Server'

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
})
