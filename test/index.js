/*global it: true, describe: true */
/*eslint no-console: 0*/

import should from 'should'
import DataView from '../src'

describe('shasta-data-view', () => {
  it('should exist', (done) => {
    should.exist(DataView)
    done()
  })
})
