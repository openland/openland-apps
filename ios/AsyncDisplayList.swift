//
//  AsyncDisplayList.swift
//  openland
//
//  Created by Steve Kite on 8/20/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import AsyncDisplayKit
import SwiftyJSON

class AsyncDisplayListCell: ASCellNode {
  let config: JSON
  
  required init(config: JSON) {
    print("New Cell")
    self.config = config
    super.init()
    self.automaticallyManagesSubnodes = true
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    let c = JSON(parseJSON: config.dictionaryValue["layout"]!.stringValue)
    let res = buildLayoutSpec(src: c);
    return res;
  }
}

@objc(AsyncDisplayList)
class AsyncDisplayList: RCTView, ASTableDataSource, ASTableDelegate {
  
  private var node: ASTableNode = ASTableNode()
  private var items: [JSON] = []
  
  override init(frame: CGRect) {
    super.init(frame: frame);
    node.dataSource = self
    node.delegate = self
    self.frame = frame;
    self.addSubview(node.view)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  func numberOfSections(in tableNode: ASTableNode) -> Int {
    return 1
  }
  
  func tableNode(_ tableNode: ASTableNode, numberOfRowsInSection section: Int) -> Int {
    return items.count
  }
  
  func tableNode(_ tableNode: ASTableNode, nodeBlockForRowAt indexPath: IndexPath) -> ASCellNodeBlock {
    let data = items[indexPath.row]
    let cellNodeBlock = { () -> ASCellNode in
      return AsyncDisplayListCell(config: data)
    }
    return cellNodeBlock
  }
  
  public func setConfig(_ config: String) {
    self.items = JSON(parseJSON: config).arrayValue
    self.node.reloadData()
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    node.frame = frame;
    setNeedsDisplay()
    setNeedsLayout()
  }
}

@objc(AsyncDisplayListManager)
class AsyncDisplayListManager: RCTViewManager {
  override func view() -> UIView! {
    return AsyncDisplayList()
  }
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
