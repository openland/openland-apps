//
//  RNAsyncList.swift
//  openland
//
//  Created by Steve Kite on 8/22/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNASyncList: ASDisplayNode, ASCollectionDataSource {
  let node: ASCollectionNode
  var data: [AsyncViewSpec]
  
  init(data: [AsyncViewSpec]) {
    let layout = UICollectionViewFlowLayout()
    layout.scrollDirection = UICollectionViewScrollDirection.vertical
    self.node = ASCollectionNode(collectionViewLayout: layout)
    self.data = data
    super.init()
    addSubnode(node)
    self.node.dataSource = self
  }
  
  func numberOfSections(in collectionNode: ASCollectionNode) -> Int {
    return 1
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, numberOfItemsInSection section: Int) -> Int {
    return self.data.count
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, nodeForItemAt indexPath: IndexPath) -> ASCellNode {
    let res = ASCellNode()
    let d = self.data[indexPath.row]
    res.automaticallyManagesSubnodes = true
    res.layoutSpecBlock = { node, constrainedSize in
      return resolveNode(spec: d) as! ASLayoutSpec
    }
    return res
  }

  
//  func numberOfSections(in tableNode: ASTableNode) -> Int {
//    return 1
//  }
//
//  func tableNode(_ tableNode: ASTableNode, numberOfRowsInSection section: Int) -> Int {
//    return self.data.count
//  }
//
//  func tableNode(_ tableNode: ASTableNode, nodeForRowAt indexPath: IndexPath) -> ASCellNode {
//    let res = ASCellNode()
//    let d = self.data[indexPath.row]
//    res.automaticallyManagesSubnodes = true
//    res.layoutSpecBlock = { node, constrainedSize in
//      return resolveNode(spec: d) as! ASLayoutSpec
//    }
//    return res
//  }
  
//  func numberOfSections(in collectionNode: ASCollectionNode) -> Int {
//    return 1
//  }
//
//  func collectionNode(_ collectionNode: ASCollectionNode, numberOfItemsInSection section: Int) -> Int {
//    return self.data.count
//  }
//
//  func collectionNode(_ collectionNode: ASCollectionNode, nodeForItemAt indexPath: IndexPath) -> ASCellNode {
//    let res = ASCellNode()
//    let d = self.data[indexPath.row]
//    res.automaticallyManagesSubnodes = true
//    res.layoutSpecBlock = { node, constrainedSize in
//      print("layouting")
//      return resolveNode(spec: d) as! ASLayoutSpec
//    }
//    return res
//  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
