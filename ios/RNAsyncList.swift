//
//  RNAsyncList.swift
//  openland
//
//  Created by Steve Kite on 8/22/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNASyncList: ASDisplayNode, ASCollectionDataSource, RNAsyncDataViewDelegate {
  let node: ASCollectionNode
  var data: [RNAsyncDataViewItem]
  let dataView: RNAsyncDataView
  let width = UIScreen.main.bounds.width
  
  init(spec: AsyncListViewSpec) {
    let layout = UICollectionViewFlowLayout()
    layout.minimumLineSpacing = 0.0
    layout.minimumInteritemSpacing = 0.0
    layout.scrollDirection = UICollectionViewScrollDirection.vertical
    self.node = ASCollectionNode(collectionViewLayout: layout)
    self.node.contentInset = UIEdgeInsets(top: CGFloat(spec.contentPaddingTop), left: 0.0, bottom: CGFloat(spec.contentPaddingBottom), right: 0.0)
    self.node.view.scrollIndicatorInsets = UIEdgeInsets(top: CGFloat(spec.contentPaddingTop), left: 0.0, bottom: CGFloat(spec.contentPaddingBottom), right: 0.0)
    self.node.alwaysBounceVertical = true
    self.node.inverted = spec.inverted
    self.node.insetsLayoutMarginsFromSafeArea = false
    self.node.backgroundColor = UIColor.clear
    self.dataView = RNAsyncDataView.getDataView(key: spec.dataViewKey)
    self.data = self.dataView.items
    // self.node.reloadData()
    super.init()
    addSubnode(node)
    
    self.node.dataSource = self
    self.dataView.watch(delegate: self)
  }
  
//  func onUpdated(items: [RNAsyncDataViewItem]) {
//    DispatchQueue.main.async {
//      self.node.performBatchUpdates({
//        self.data = items
//        // self.node.reloadData()
//      }, completion: { (completed) in
//        //
//      })
//    }
//  }

  func onInited(items: [RNAsyncDataViewItem]) {
    DispatchQueue.main.async {
      self.data = items
      self.node.reloadData()
    }
  }
  
  func onAdded(index: Int, items: [RNAsyncDataViewItem]) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.data = items
        self.node.insertItems(at: [IndexPath(row: index, section: 0)])
      }, completion: nil)
    }
  }
  
  func onMoved(from: Int, to: Int, items: [RNAsyncDataViewItem]) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.data = items
        self.node.moveItem(at: IndexPath(item: from, section: 0), to: IndexPath(item: to, section: 0))
      }, completion: nil)
    }
  }
  
  func onUpdated(index: Int, items: [RNAsyncDataViewItem]) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.data = items
        self.node.reloadItems(at: [IndexPath(item: index, section: 0)])
      }, completion: nil)
    }
  }
  
  func numberOfSections(in collectionNode: ASCollectionNode) -> Int {
    return 1
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, numberOfItemsInSection section: Int) -> Int {
    return self.data.count
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, nodeBlockForItemAt indexPath: IndexPath) -> ASCellNodeBlock {
    let d = self.data[indexPath.row]
    return { () -> ASCellNode in
      let res = ASCellNode()
      res.automaticallyManagesSubnodes = true
      res.layoutSpecBlock = { node, constrainedSize in
        let res = ASStackLayoutSpec()
        res.direction = ASStackLayoutDirection.vertical
        res.alignItems = ASStackLayoutAlignItems.stretch
        res.child = resolveNode(spec: d.config)
        res.style.width = ASDimension(unit: ASDimensionUnit.points, value: self.width)
        return res
      }
      return res
    }
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
