import {expect} from 'chai'
import 'mocha'
import {removeUndefined} from '../src/selectors'

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
