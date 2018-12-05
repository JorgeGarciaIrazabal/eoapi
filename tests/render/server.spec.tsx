import {expect} from 'chai'
import * as React from 'react'
import 'mocha'
import Server from '../../src/components/Server'
import ServerVariable from '../../src/components/ServerVariable'
import {renderServer} from '../../src/renders/server'

describe('Server render', () => {
  it('construct json with basic parameters', () => {
    const server = (
      <Server
        url="{protocol}://myurl.com"
        description="my description"
      >
        <ServerVariable name="test" />
      </Server>
    )
    const serverJson = renderServer(server, {version: '1.0.0', outputObj: {}}).output
    expect(serverJson.description).to.eq('my description')
    expect(serverJson.url).to.eq('{protocol}://myurl.com')
    expect(Object.keys(serverJson.variables)).to.have.length(1)
    expect(serverJson.variables).to.have.property('test')
  })

  it('construct json with enum', () => {
    const protocols = ['http', 'https']
    const server = (
      <Server
        url="{protocol}://myurl.com"
      >
        <ServerVariable name="protocol" enum={protocols} />
      </Server>
    )
    const serverJson = renderServer(server, {version: '1.0.0', outputObj: {}}).output
    expect(serverJson.variables).to.have.property('protocol')
    expect(serverJson.variables.protocol).to.have.property('enum')
    expect(serverJson.variables.protocol.enum).to.eql(protocols)
  })
})
