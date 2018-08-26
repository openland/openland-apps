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
  let width = UIScreen.main.bounds.width
  
  init(spec: AsyncListViewSpec, data: [AsyncViewSpec]) {
    let layout = UICollectionViewFlowLayout()
    layout.minimumLineSpacing = 0.0
    layout.minimumInteritemSpacing = 0.0
    layout.scrollDirection = UICollectionViewScrollDirection.vertical
    self.node = ASCollectionNode(collectionViewLayout: layout)
    self.node.contentInset = UIEdgeInsets(top: CGFloat(spec.contentPaddingTop), left: 0.0, bottom: CGFloat(spec.contentPaddingBottom), right: 0.0)
    self.node.view.scrollIndicatorInsets = UIEdgeInsets(top: CGFloat(spec.contentPaddingTop), left: 0.0, bottom: CGFloat(spec.contentPaddingBottom), right: 0.0)
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
      let res = ASStackLayoutSpec()
      res.direction = ASStackLayoutDirection.vertical
      res.alignItems = ASStackLayoutAlignItems.stretch
      res.child = resolveNode(spec: d)
      res.style.width = ASDimension(unit: ASDimensionUnit.points, value: self.width)
      return res
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
