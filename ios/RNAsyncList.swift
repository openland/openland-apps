//
//  RNAsyncList.swift
//  openland
//
//  Created by Steve Kite on 8/22/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNASyncList: ASDisplayNode, ASCollectionDataSource, ASCollectionDelegate, RNAsyncDataViewDelegate {
  
  let width = UIScreen.main.bounds.width // Screen width
  let context: RNAsyncViewContext
  let node: ASCollectionNode
  
  var state: RNAsyncDataViewState!
  var isLoading: Bool? = nil
  var dataView: RNAsyncDataView!
  
  var batchContext: ASBatchContext? = nil
  
  init(context: RNAsyncViewContext) {
    self.context = context
    let layout = UICollectionViewFlowLayout()
    layout.minimumLineSpacing = 0.0
    layout.minimumInteritemSpacing = 0.0
    layout.scrollDirection = UICollectionViewScrollDirection.vertical
    self.node = ASCollectionNode(collectionViewLayout: layout)
    self.node.alwaysBounceVertical = true
    self.node.backgroundColor = UIColor.clear
    super.init()
    addSubnode(node)
    self.node.dataSource = self
    self.node.delegate = self
  }
  
  func setSpec(spec: AsyncListViewSpec) {
    
    // DataView can't be changed
    if self.dataView != nil {
      if self.dataView.dataSourceKey != spec.dataViewKey {
        fatalError()
      }
    }
    
    // Update styles
    let insets = UIEdgeInsets(top: CGFloat(spec.contentPaddingTop), left: 0.0, bottom: CGFloat(spec.contentPaddingBottom), right: 0.0)
    self.node.contentInset = insets
    self.node.view.scrollIndicatorInsets = insets
    if #available(iOS 11.0, *) {
      self.node.view.contentInsetAdjustmentBehavior = .never
    }
    self.node.inverted = spec.inverted
    
    // Create Data View if needed
    if self.dataView == nil {
      self.dataView = RNAsyncDataView.getDataView(key: spec.dataViewKey)
      self.state = self.dataView!.state
      self.dataView.watch(delegate: self)
      // WARNING: There are no call self.node.reloadData() since we are expect setSpec to be called right
      // after constructor invocation
      
      self.isLoading = spec.loading
    }
  }
  
  //
  // Data View Delegate
  //
  
  func onInited(state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.state = state
      self.node.reloadData()
    }
  }
  
  func onAdded(index: Int, state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.state = state
        self.node.insertItems(at: [IndexPath(row: index, section: 0)])
      }, completion: nil)
    }
  }
  
  func onMoved(from: Int, to: Int, state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.state = state
        self.node.moveItem(at: IndexPath(item: from, section: 0), to: IndexPath(item: to, section: 0))
      }, completion: nil)
    }
  }
  
  func onUpdated(index: Int, state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.state = state
        self.node.reloadItems(at: [IndexPath(item: index, section: 0)])
      }, completion: nil)
    }
  }
  
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        let wasCompleted = self.state.completed
        self.state = state
        var paths: [IndexPath] = []
        for i in from...from+count-1 {
          paths.append(IndexPath(item: i, section: 0))
        }
        self.node.insertItems(at: paths)
        if wasCompleted != state.completed {
          self.node.reloadSections(IndexSet(integer: 1))
        }
        self.batchContext?.completeBatchFetching(true)
        self.batchContext = nil
      }, completion: nil)
    }
  }
  
  func onCompleted(state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.state = state
        self.node.reloadSections(IndexSet(integer: 1))
        self.batchContext?.completeBatchFetching(true)
        self.batchContext = nil
      })
    }
  }
  
  //
  // Collection Node delegate
  //
  
  func shouldBatchFetch(for collectionNode: ASCollectionNode) -> Bool {
    return !self.state.completed
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, willBeginBatchFetchWith context: ASBatchContext) {
    AsyncViewEventEmitter.sharedInstance.dispatchOnLoadMore(key: self.dataView!.dataSourceKey)
  }
  
  func numberOfSections(in collectionNode: ASCollectionNode) -> Int {
    if self.dataView == nil {
      fatalError()
    }
    return 2
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, numberOfItemsInSection section: Int) -> Int {
    if self.dataView == nil {
      fatalError()
    }
    if section == 0 {
      return self.state.items.count
    } else {
      return 1
    }
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, nodeBlockForItemAt indexPath: IndexPath) -> ASCellNodeBlock {
    if self.dataView == nil {
      fatalError()
    }
    if indexPath.section == 0 {
      let d = self.state.items[indexPath.row]
      return { () -> ASCellNode in
        let res = ASCellNode()
        res.automaticallyManagesSubnodes = true
        res.layoutSpecBlock = { node, constrainedSize in
          let res = ASStackLayoutSpec()
          res.direction = ASStackLayoutDirection.vertical
          res.alignItems = ASStackLayoutAlignItems.stretch
          res.child = resolveNode(spec: d.config, context: self.context)
          res.style.width = ASDimension(unit: ASDimensionUnit.points, value: self.width)
          return res
        }
        return res
      }
    } else {
      let isCompleted = self.state.completed
      return { () -> ASCellNode in
        let res = ASCellNode()
        res.automaticallyManagesSubnodes = true
        res.layoutSpecBlock = { node, constrainedSize in
          let res = ASStackLayoutSpec()
          res.direction = ASStackLayoutDirection.vertical
          res.alignItems = ASStackLayoutAlignItems.center
          res.justifyContent = ASStackLayoutJustifyContent.center
          if !isCompleted {
            res.child = RNAsyncLoadingIndicator()
          }
          res.style.width = ASDimension(unit: ASDimensionUnit.points, value: self.width)
          res.style.height = ASDimension(unit: ASDimensionUnit.points, value: 64.0)
          return res
        }
        return res
      }
    }
  }
  
  //
  // Node Layout
  //

  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    if self.dataView == nil {
      fatalError()
    }
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
