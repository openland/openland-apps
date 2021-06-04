//
//  RNGraphqlDescriptor.swift
//  openland
//
//  Created by Steve Korshakov on 6/4/21.
//  Copyright © 2021 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

class RNGraphqlDescriptor {
  init(descriptor: String) {
    let src = JSON(parseJSON: descriptor)
  }
}
