//
//  RNAsyncList.swift
//  openland
//
//  Created by Steve Kite on 8/22/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import BouncyLayout

class RNASyncListNode: ASDisplayNode, ASCollectionDataSource, ASCollectionDelegate, RNAsyncDataViewDelegate {
  
  let width = UIScreen.main.bounds.width // Screen width
  let context: RNAsyncViewContext = RNAsyncViewContext()
  weak var parent: RNAsyncListView!
  var node: ASCollectionNode!
  
  var state: RNAsyncDataViewState!
  var headerPadding: Float = 0.0
  var dataView: RNAsyncDataView!
  
  var batchContext: ASBatchContext? = nil
  var keyboardVisible = false
  var bottomInset: Float = 0.0
  var topInset: Float = 0.0
  var onScrollCallback: RCTDirectEventBlock? = nil
  
  init(parent: RNAsyncListView) {
    self.parent = parent
    let layout = UICollectionViewFlowLayout()
    layout.minimumLineSpacing = 0.0
    layout.minimumInteritemSpacing = 0.0
    layout.scrollDirection = UICollectionViewScrollDirection.vertical
    self.node = ASCollectionNode(collectionViewLayout: layout)
    self.node.alwaysBounceVertical = true
    self.node.backgroundColor = UIColor.clear
    self.node.view.keyboardDismissMode = .interactive
    if #available(iOS 11.0, *) {
      self.node.view.contentInsetAdjustmentBehavior = .never
    }
    super.init()
    addSubnode(node)
    self.node.dataSource = self
    self.node.delegate = self
    
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardDidShow), name: NSNotification.Name.UIKeyboardDidShow, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillChangeFrame), name: NSNotification.Name.UIKeyboardWillChangeFrame, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardDidHide), name: NSNotification.Name.UIKeyboardDidHide, object: nil)
  }
  
  var keyboardShown = false
  var keyboardHiding = false
  
  func keyboardWillShow(aNotification: Notification) {
    if self.node.inverted {
      if self.keyboardVisible {
        return
      }
//      if self.keyboardShown {
//        self.keyboardShown = false
//        return
//      }
      let k = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! NSNumber
      let d = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! NSNumber
      let r = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
      let r2 = aNotification.userInfo![UIKeyboardFrameBeginUserInfoKey] as! CGRect
      self.keyboardVisible = true
      self.keyboardHiding = false
      // self.keyboardShown = true
      let delta = self.node.contentInset.top - r.height
      self.node.contentInset.top = r.height
      UIView.animate(withDuration: TimeInterval(d), delay: 0.0, options: UIViewAnimationOptions(rawValue: UInt(k)), animations: {
        self.node.view.scrollIndicatorInsets.top = r.height
        let offset = CGPoint(x: 0, y: self.node.view.contentOffset.y + delta)
        self.node.setContentOffset(offset, animated: false)
      }, completion: { (bool) in
        self.keyboardShown = true
      }  )
    }
  }
  
  func keyboardDidShow(aNotification: Notification) {
//    if self.node.inverted {
//      print("didShow")
//      if !self.keyboardVisible {
//        return
//      }
//      self.keyboardShown = true
//    }
  }
  
  func keyboardWillChangeFrame(aNotification: Notification) {
    if self.node.inverted {
      let k = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! NSNumber
      let d = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! NSNumber
      let r = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
      let r2 = aNotification.userInfo![UIKeyboardFrameBeginUserInfoKey] as! CGRect
      
      if self.keyboardShown && self.keyboardVisible {
        let delta = self.node.contentInset.top - r.height
        self.node.contentInset.top = r.height
        if delta < 0 {
          UIView.animate(withDuration: TimeInterval(d), delay: 0.0, options: UIViewAnimationOptions(rawValue: UInt(k)), animations: {
            self.node.view.scrollIndicatorInsets.top = r.height
            let offset = CGPoint(x: 0, y: self.node.view.contentOffset.y + delta)
            self.node.setContentOffset(offset, animated: false)
          }, completion: nil)
        } else {
          let offset = CGPoint(x: 0, y: self.node.view.contentOffset.y + delta)
          self.node.setContentOffset(offset, animated: false)
          UIView.animate(withDuration: TimeInterval(d), delay: 0.0, options: UIViewAnimationOptions(rawValue: UInt(k)), animations: {
            self.node.view.scrollIndicatorInsets.top = r.height
            let offset = CGPoint(x: 0, y: self.node.view.contentOffset.y - delta)
            self.node.setContentOffset(offset, animated: false)
          }, completion: nil)
        }
      }
    }
  }
  
  func keyboardWillHide(aNotification: Notification) {
    if self.node.inverted {
      if self.keyboardHiding {
        return
      }
      self.keyboardHiding = true
//      let k = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! NSNumber
//      let d = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! NSNumber
      self.node.view.scrollIndicatorInsets.top = CGFloat(self.bottomInset)
      self.node.view.contentInset.top = CGFloat(self.bottomInset)
      self.keyboardVisible = false
      self.keyboardShown = false
//      UIView.animate(withDuration: TimeInterval(d), delay: 0.0, options: UIViewAnimationOptions(rawValue: UInt(k)), animations: {
//        self.node.view.contentInset.top = CGFloat(self.bottomInset)
//      }, completion: { (b) in
//        self.keyboardVisible = false
//        self.keyboardShown = false
//      })
      // }
    }
  }
  
  func keyboardDidHide(aNotification: Notification) {
    if self.node.inverted {
      self.keyboardVisible = false
      self.keyboardShown = false
    }
  }
  
  func setDataView(dataView: RNAsyncDataView) {
    self.dataView = dataView
    self.state = self.dataView!.state
    // TODO: UNSUBSCRIBE
    self.dataView.watch(delegate: self)
  }
  
  func setInverted(inverted: Bool) {
    self.node.inverted = inverted
  }
  
  func setContentPaddingTop(value: Float) {
    if self.topInset != value {
      self.topInset = value
      self.updateContentPadding()
    }
  }
  
  func setContentPaddingBottom(value: Float) {
    if self.bottomInset != value {
      self.bottomInset = value
      self.updateContentPadding()
    }
  }
  
  func setOnScroll(callback: RCTDirectEventBlock?) {
    self.onScrollCallback = callback
  }
  
  func scrollViewDidScroll(_ scrollView: UIScrollView) {
    
    let offsetX = scrollView.contentOffset.x
    let offsetY = scrollView.contentOffset.y + CGFloat(self.topInset)
    
    if self.onScrollCallback != nil {
      let contentOffset = NSMutableDictionary()
      contentOffset.setValue(offsetY, forKey: "y")
      contentOffset.setValue(offsetX, forKey: "x")
      let body = NSMutableDictionary()
      body.setValue(contentOffset, forKey: "contentOffset")
      self.onScrollCallback!(body as! [AnyHashable : Any])
    }
    
    let strongParent = self.parent
    if strongParent != nil {
      strongParent!.eventDispatcher.send(RNListNodeScrollEvent(
        viewTag: strongParent!.reactTag,
        offsetX: offsetX,
        offsetY: offsetY))
    }
  }
  
  func setHeaderPadding(padding: Float) {
    DispatchQueue.main.async {
      self.node.performBatch(animated: false, updates: {
        self.headerPadding = padding
        self.node.reloadSections(IndexSet(integer: 0))
      }, completion: nil)
    }
  }
  
  private func updateContentPadding() {
      if !self.keyboardVisible {
        let insets = UIEdgeInsets(top: CGFloat(self.node.inverted ? (self.keyboardVisible ? 0 : self.bottomInset) : self.topInset), left: 0.0, bottom: CGFloat(self.node.inverted ? self.topInset: (self.keyboardVisible ? 0 : self.bottomInset)), right: 0.0)
        self.node.view.scrollIndicatorInsets = insets
        self.node.contentInset = insets
    }
  }
  
  deinit {
    NotificationCenter.default.removeObserver(self)
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
        self.node.insertItems(at: [IndexPath(row: index, section: 1)])
      }, completion: nil)
    }
  }
  
  func onMoved(from: Int, to: Int, state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatchUpdates({
        self.state = state
        self.node.moveItem(at: IndexPath(item: from, section: 1), to: IndexPath(item: to, section: 1))
      }, completion: nil)
    }
  }
  
  func onUpdated(index: Int, state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatch(animated: false, updates: {
        self.state = state
        self.node.reloadItems(at: [IndexPath(item: index, section: 1)])
      }, completion: nil)
    }
  }
  
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatch(animated: false, updates: {
        let wasCompleted = self.state.completed
        self.state = state
        if count > 0 {
          var paths: [IndexPath] = []
          for i in from...from+count-1 {
            paths.append(IndexPath(item: i, section: 1))
          }
          self.node.insertItems(at: paths)
        }
        if wasCompleted != state.completed {
          self.node.reloadSections(IndexSet(integer: 2))
        }
        self.batchContext?.completeBatchFetching(true)
        self.batchContext = nil
      }, completion: nil)
    }
  }
  
  func onCompleted(state: RNAsyncDataViewState) {
    DispatchQueue.main.async {
      self.node.performBatch(animated: false, updates: {
        self.state = state
        self.node.reloadSections(IndexSet(integer: 2))
        self.batchContext?.completeBatchFetching(true)
        self.batchContext = nil
      }, completion: nil)
    }
  }
  
  //
  // Collection Node delegate
  //
  
  func shouldBatchFetch(for collectionNode: ASCollectionNode) -> Bool {
    return !self.state.completed
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, willBeginBatchFetchWith context: ASBatchContext) {
    self.batchContext = context
    AsyncViewEventEmitter.sharedInstance.dispatchOnLoadMore(key: self.dataView!.dataSourceKey)
  }
  
  func numberOfSections(in collectionNode: ASCollectionNode) -> Int {
    if self.dataView == nil {
      fatalError()
    }
    return 3
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, numberOfItemsInSection section: Int) -> Int {
    if self.dataView == nil {
      fatalError()
    }
    if section == 1 {
      return self.state.items.count
    } else {
      return 1
    }
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, nodeBlockForItemAt indexPath: IndexPath) -> ASCellNodeBlock {
    if self.dataView == nil {
      fatalError()
    }
    if indexPath.section == 1 {
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
    } else if indexPath.section == 2 {
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
    } else if indexPath.section == 0 {
      let padding = self.headerPadding
      return { () -> ASCellNode in
        let res = ASCellNode()
        res.automaticallyManagesSubnodes = true
        res.layoutSpecBlock = { node, constrainedSize in
          let res = ASStackLayoutSpec()
          res.direction = ASStackLayoutDirection.vertical
          res.alignItems = ASStackLayoutAlignItems.center
          res.justifyContent = ASStackLayoutJustifyContent.center
          res.style.width = ASDimension(unit: ASDimensionUnit.points, value: self.width)
          res.style.height = ASDimension(unit: ASDimensionUnit.points, value: CGFloat(padding))
          return res
        }
        return res
      }
    } else {
      fatalError()
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

class RNListNodeScrollEvent:NSObject, RCTEvent {
  var viewTag: NSNumber
  var offsetX: CGFloat
  var offsetY: CGFloat
  
  var eventName: String = "onScroll"
  var coalescingKey: UInt16 = 0
  
  init(viewTag: NSNumber, offsetX: CGFloat, offsetY: CGFloat) {
    self.viewTag = viewTag
    self.offsetX = offsetX
    self.offsetY = offsetY
    super.init()
  }
  
  func canCoalesce() -> Bool {
    return true
  }
  
  func coalesce(with newEvent: RCTEvent!) -> RCTEvent! {
    return newEvent
  }
  
  static func moduleDotMethod() -> String! {
    return "RCTEventEmitter.receiveEvent"
  }
  
  func arguments() -> [Any]! {
    let contentOffset = NSMutableDictionary()
    contentOffset.setValue(self.offsetY, forKey: "y")
    contentOffset.setValue(self.offsetX, forKey: "x")
    let body = NSMutableDictionary()
    body.setValue(contentOffset, forKey: "contentOffset")
    return [self.viewTag, RCTNormalizeInputEventName(self.eventName), body]
  }
}
