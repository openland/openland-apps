import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XMap } from '../../../components/X/XMap';

let page = JSON.parse(`{
    "took": 10,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "skipped": 0,
      "failed": 0
    },
    "hits": {
      "total": 5,
      "max_score": 1,
      "hits": [
        {
          "_index": "parcels",
          "_type": "parcel",
          "_id": "01BYDGEBNPlYIHSeDnAe",
          "_score": 1,
          "_source": {
            "location": {
              "coordinates": [
                [
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ],
                  [
                    -122.41444804466008,
                    37.807725984666405
                  ],
                  [
                    -122.41440714510853,
                    37.80752258286327
                  ],
                  [
                    -122.41457809917222,
                    37.80750116261024
                  ],
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        },
        {
          "_index": "parcels",
          "_type": "parcel",
          "_id": "0FA9DGEBNPlYIHSeQHBf",
          "_score": 1,
          "_source": {
            "location": {
              "type": "point",
              "coordinates": [
                -77.03653,
                38.897676
              ]
            }
          }
        },
        {
          "_index": "parcels",
          "_type": "parcel",
          "_id": "0VBYDGEBNPlYIHSeBHCU",
          "_score": 1,
          "_source": {
            "location": {
              "coordinates": [
                [
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ],
                  [
                    -122.41444804466008,
                    37.807725984666405
                  ],
                  [
                    -122.41440714510853,
                    37.80752258286327
                  ],
                  [
                    -122.41457809917222,
                    37.80750116261024
                  ],
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        },
        {
          "_index": "parcels",
          "_type": "parcel",
          "_id": "1FBYDGEBNPlYIHSeD3B0",
          "_score": 1,
          "_source": {
            "location": {
              "coordinates": [
                [
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ],
                  [
                    -122.41444804466008,
                    37.807725984666405
                  ],
                  [
                    -122.41440714510853,
                    37.80752258286327
                  ],
                  [
                    -122.41457809917222,
                    37.80750116261024
                  ],
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        },
        {
          "_index": "parcels",
          "_type": "parcel",
          "_id": "0lBYDGEBNPlYIHSeC3Dh",
          "_score": 1,
          "_source": {
            "location": {
              "coordinates": [
                [
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ],
                  [
                    -122.41444804466008,
                    37.807725984666405
                  ],
                  [
                    -122.41440714510853,
                    37.80752258286327
                  ],
                  [
                    -122.41457809917222,
                    37.80750116261024
                  ],
                  [
                    -122.41461900033902,
                    37.80770456523733
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        }
      ]
    }
  }`)

export default withPage((page) => {
    return (
        <>
        <div className="x-in">
            <XMap height={400} width={400} />
        </div>
        </>
    )
});