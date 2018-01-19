import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XMap } from '../../../components/X/XMap';
import { XMapOverlay } from '../../../components/X/XMapOverlay';

// let page = JSON.parse(`{
//     "took": 10,
//     "timed_out": false,
//     "_shards": {
//       "total": 5,
//       "successful": 5,
//       "skipped": 0,
//       "failed": 0
//     },
//     "hits": {
//       "total": 5,
//       "max_score": 1,
//       "hits": [
//         {
//           "_index": "parcels",
//           "_type": "parcel",
//           "_id": "01BYDGEBNPlYIHSeDnAe",
//           "_score": 1,
//           "_source": {
//             "location": {
//               "coordinates": [
//                 [
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ],
//                   [
//                     -122.41444804466008,
//                     37.807725984666405
//                   ],
//                   [
//                     -122.41440714510853,
//                     37.80752258286327
//                   ],
//                   [
//                     -122.41457809917222,
//                     37.80750116261024
//                   ],
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ]
//                 ]
//               ],
//               "type": "Polygon"
//             }
//           }
//         },
//         {
//           "_index": "parcels",
//           "_type": "parcel",
//           "_id": "0FA9DGEBNPlYIHSeQHBf",
//           "_score": 1,
//           "_source": {
//             "location": {
//               "type": "point",
//               "coordinates": [
//                 -77.03653,
//                 38.897676
//               ]
//             }
//           }
//         },
//         {
//           "_index": "parcels",
//           "_type": "parcel",
//           "_id": "0VBYDGEBNPlYIHSeBHCU",
//           "_score": 1,
//           "_source": {
//             "location": {
//               "coordinates": [
//                 [
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ],
//                   [
//                     -122.41444804466008,
//                     37.807725984666405
//                   ],
//                   [
//                     -122.41440714510853,
//                     37.80752258286327
//                   ],
//                   [
//                     -122.41457809917222,
//                     37.80750116261024
//                   ],
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ]
//                 ]
//               ],
//               "type": "Polygon"
//             }
//           }
//         },
//         {
//           "_index": "parcels",
//           "_type": "parcel",
//           "_id": "1FBYDGEBNPlYIHSeD3B0",
//           "_score": 1,
//           "_source": {
//             "location": {
//               "coordinates": [
//                 [
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ],
//                   [
//                     -122.41444804466008,
//                     37.807725984666405
//                   ],
//                   [
//                     -122.41440714510853,
//                     37.80752258286327
//                   ],
//                   [
//                     -122.41457809917222,
//                     37.80750116261024
//                   ],
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ]
//                 ]
//               ],
//               "type": "Polygon"
//             }
//           }
//         },
//         {
//           "_index": "parcels",
//           "_type": "parcel",
//           "_id": "0lBYDGEBNPlYIHSeC3Dh",
//           "_score": 1,
//           "_source": {
//             "location": {
//               "coordinates": [
//                 [
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ],
//                   [
//                     -122.41444804466008,
//                     37.807725984666405
//                   ],
//                   [
//                     -122.41440714510853,
//                     37.80752258286327
//                   ],
//                   [
//                     -122.41457809917222,
//                     37.80750116261024
//                   ],
//                   [
//                     -122.41461900033902,
//                     37.80770456523733
//                   ]
//                 ]
//               ],
//               "type": "Polygon"
//             }
//           }
//         }
//       ]
//     }
//   }`)

export default withPage((props) => {
    return (
        <>
        <div className="x-in">
            <XMap style={{ width: '100%', height: 400 }}>
                <XMapOverlay
                    records={[{
                        id: '123',
                        polygons: [[
                            { latitude: 49.2407190, longitude: -123.0249569 },
                            { latitude: 49.2407165, longitude: -123.0241582 },
                            { latitude: 49.2406847, longitude: -123.0240445 },
                            { latitude: 49.2407159, longitude: -123.0239311 },
                            { latitude: 49.2407157, longitude: -123.0238530 },
                            { latitude: 49.2404548, longitude: -123.0238536 },
                            { latitude: 49.2404582, longitude: -123.0249568 },
                            { latitude: 49.2407190, longitude: -123.0249569 }
                        ]]
                    }]}
                />
            </XMap>
        </div>
        </>
    )
});