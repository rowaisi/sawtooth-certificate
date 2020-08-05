/**
 * Copyright 2018 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */

'use strict'

const m = require('mithril')
const sortBy = require('lodash/sortBy')
const Table = require('../components/tables.js')
const api = require('../services/api')

const ArtworkList = {
  oninit (vnode) {
    vnode.state.records = []
    var recordsFinal = []
    api.get('records').then((records) => {
        const rec = JSON.parse(JSON.stringify(sortBy(records, 'record_id')))
        for(var i = 0; i < rec.length; i++){
          recordsFinal.push({record_id: rec[i].record_id, data: rec[i].locations[0]})
        }
        vnode.state.records = recordsFinal
      })
  },

  view (vnode) {
    return [
      m('.record-list',
        m(Table, {
          headers: [
            'ID',  
            'TS', 
            'Seq'
          ],
          rows: vnode.state.records
            .map((record) => [
              record.record_id,
              record.data.ts,
              record.data.seq,
            ]),
          noRowsText: 'No records found'
        })
      )
    ]
  }
}

module.exports = ArtworkList
