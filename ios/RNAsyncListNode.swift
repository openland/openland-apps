//
//  RNAsyncList.swift
//  openland
//
//  Created by Steve Kite on 8/22/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNASyncListNode: ASDisplayNode, ASCollectionDataSource, ASCollectionDelegate, RNAsyncDataViewDelegate, RNAsyncKeyboardManagerDelegate {
  
  weak var parent: RNAsyncListView!
  private let context: RNAsyncViewContext = RNAsyncViewContext()
  private var node: ASCollectionNode!
  private let queue: DispatchQueue
  
  private var state: RNAsyncDataViewState = RNAsyncDataViewState(items: [], completed: false, inited: false)
  private var headerPadding: Float = 0.0
  private var dataView: RNAsyncDataViewWindow!
  private var dataViewUnsubscribe: (()->Void)? = nil
  
  private var batchContext: ASBatchContext? = nil
  private var keyboardVisible = false
  private var bottomInset: Float = 0.0
  private var topInset: Float = 0.0
  private var onScrollCallback: RCTDirectEventBlock? = nil
  
  private var loaded = false
  private var activeCells = WeakMap<RNAsyncCell>()
  private var activeCellsStrong: [String:RNAsyncCell] = [:]
  private var viewLoaded = false
  private var keyboardSubscription: (() -> Void)?
  private var isDragging = false
  private var keyboardHeight: CGFloat = 0.0
  private var keyboard: RNAsyncKeyboardContextView? = nil
  
  init(parent: RNAsyncListView) {
    self.parent = parent
    self.queue = DispatchQueue(label: "rn-async-node")
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
    
    self.keyboardSubscription = RNAsyncKeyboardManager.sharedInstance.watch(delegate: self)
  }
  
  func start() {
    if self.loaded {
      return
    }
    self.loaded = true
    self.node.view.keyboardDismissMode = .interactive
    if #available(iOS 11.0, *) {
      self.node.view.contentInsetAdjustmentBehavior = .never
    }
    self.dataViewUnsubscribe = self.dataView.watch(delegate: self)
    self.viewLoaded = true
    
    self.fixContentInset(interactive: false)
    
    self.keyboard = self.parent.resolveKeyboardContextKey()
  }
  
  func destroy() {
    self.keyboard = nil
    NotificationCenter.default.removeObserver(self)
    if self.dataViewUnsubscribe != nil {
      self.dataViewUnsubscribe!()
      self.dataViewUnsubscribe = nil
    }
    if self.keyboardSubscription != nil {
      self.keyboardSubscription!()
      self.keyboardSubscription = nil
    }
  }
  
  func keyboardWillChangeHeight(ctx: String, height: CGFloat) {
    if let k = self.keyboard {
      if k.keyboardContextKey == ctx {
        if self.node.inverted {
          self.keyboardHeight = height
          
          print("keyboardWillChangeHeight")
          // self.fixContentInset(interactive: true)
        }
      }
    }
  }
  
  func keyboardWillShow(ctx: String, height: CGFloat, duration: Double, curve: Int) {
    if let k = self.keyboard {
      if k.keyboardContextKey == ctx {
        self.keyboardVisible = true
        self.keyboardHeight = height
        print("keyboardWillShow")
        UIView.animate(withDuration: duration, delay: 0.0, options: UIViewAnimationOptions(rawValue: UInt(curve)), animations: {
          self.fixContentInset(interactive: false)
        }, completion: nil)
      }
    }
  }
  
  func keyboardWillHide(ctx: String, height: CGFloat, duration: Double, curve: Int) {
    if let k = self.keyboard {
      if k.keyboardContextKey == ctx {
        self.keyboardVisible = false
        self.keyboardHeight = height
        print("keyboardWillHide")
        UIView.animate(withDuration: duration, delay: 0.0, options: [UIViewAnimationOptions(rawValue: UInt(curve)), UIViewAnimationOptions.beginFromCurrentState], animations: {
          self.fixContentInset(interactive: false)
        }, completion: nil)
      }
    }
  }
  
  private func fixContentInset(interactive: Bool) {
    let currentInset = self.node.inverted ? self.node.view.contentInset.top : self.node.view.contentInset.bottom
    let newInset = max(self.keyboardHeight, CGFloat(self.bottomInset))
    let insetsDiff = currentInset - newInset
    let originalOffset = self.node.contentOffset
    let size = self.node.view.contentSize
    if self.node.inverted {
      var inset = self.node.view.contentInset
      inset.top = newInset
      inset.bottom = CGFloat(self.topInset)
      self.node.view.contentInset = inset
    } else {
      self.node.view.contentInset.bottom = newInset
      self.node.view.contentInset.top = CGFloat(self.topInset)
    }
    
    if self.node.inverted && !interactive {
      print("insetsDiff \(insetsDiff)")
      print("keyboardHeight \(self.keyboardHeight)")
      print("bottomInset \(self.bottomInset)")
      print("originalOffset.y \(originalOffset.y)")
      print("newInset \(newInset)")
      print("currentInset \(currentInset)")
      print("contentSize.height \(size.height)")
      self.node.view.contentOffset = CGPoint(x: originalOffset.x, y: originalOffset.y + insetsDiff)
    }
    
    var inset = self.node.view.contentInset
    if self.node.inverted {
      inset.top = newInset
      inset.bottom = CGFloat(self.topInset)
    } else {
      inset.bottom = newInset
      inset.top = CGFloat(self.topInset)
    }
    self.node.view.scrollIndicatorInsets = inset
  }
  
  func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
    self.isDragging = true
  }
  
  func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
    self.isDragging = false
  }
  
  func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
    self.isDragging = false
  }
  
  func setDataView(dataView: RNAsyncDataView) {
    self.dataView = RNAsyncDataViewWindow(source: dataView)
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
    
    self.fixContentInset(interactive: true)
    // Update scroll bars
//    if self.keyboardVisible && self.isDragging {
////      let newInset = max(self.keyboardHeight, CGFloat(bottomInset))
////      var inset = self.node.view.scrollIndicatorInsets
////      if self.node.inverted {
////        inset.top = newInset
////      } else {
////        inset.bottom = newInset
////      }
////      self.node.view.scrollIndicatorInsets = inset
//
////      let currentInset = self.node.inverted ? self.node.view.contentInset.top : self.node.view.contentInset.bottom
//      let newInset = max(self.keyboardHeight, CGFloat(self.bottomInset))
////      print(self.keyboardHeight)
////      if self.node.inverted {
////        var inset = self.node.view.contentInset
////        inset.top = newInset
////        inset.bottom = CGFloat(self.topInset)
////        self.node.view.contentInset = inset
////      } else {
////        self.node.view.contentInset.bottom = newInset
////        self.node.view.contentInset.top = CGFloat(self.topInset)
////      }
//
//      var inset = self.node.view.contentInset
//      if self.node.inverted {
//        inset.top = newInset
//        inset.bottom = CGFloat(self.topInset)
//      } else {
//        inset.bottom = newInset
//        inset.top = CGFloat(self.topInset)
//      }
//      self.node.view.scrollIndicatorInsets = inset
//    }
    
    // Forward scroll offset
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
    if !self.loaded {
      self.headerPadding = padding
    } else {
      if self.headerPadding != padding {
        DispatchQueue.main.async {
          self.node.performBatch(animated: false, updates: {
            self.headerPadding = padding
            self.node.reloadSections(IndexSet(integer: 0))
          }, completion: nil)
        }
      }
    }
  }
  
  private func updateContentPadding() {
      if self.viewLoaded {
        self.fixContentInset(interactive: false)
    }
  }
  
  //
  // Data View Delegate
  //
  
  func onInited(state: RNAsyncDataViewState) {
    let start = DispatchTime.now()
    
    self.queue.async {
      var end = DispatchTime.now()
      var nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds
      var timeInterval = nanoTime / 1_000_000
      print("Time to start inited: \(timeInterval) ms")
      // Precaching layouts
      let myGroup = DispatchGroup()
      var pendingCells: [String: RNAsyncCell] = [:]
      let lockObj = NSObject()
      for itm in state.items {
        myGroup.enter()
        DispatchQueue.global(qos: DispatchQoS.QoSClass.userInitiated).async {
          let ex = self.activeCells.get(key: itm.key)
          if ex != nil {
            fatalError("Item already exists!")
          }
          let cell = RNAsyncCell(spec: itm.config, context: self.context)
          openland.lock(lockObj, blk: {
            self.activeCellsStrong[itm.key] = cell
            pendingCells[itm.key] = cell
          })
          myGroup.leave()
        }
      }
      myGroup.wait()
      
      end = DispatchTime.now()
      nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds
      timeInterval = nanoTime / 1_000_000
      print("Time to measure inited: \(timeInterval) ms")
      
      let indexPaths = (0..<state.items.count).map({ (i) -> IndexPath in
        IndexPath(row: i, section: 1)
      })
      
      DispatchQueue.main.async {
        var end = DispatchTime.now()
        var nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds
        var timeInterval = nanoTime / 1_000_000
        print("Time to apply inited: \(timeInterval) ms")
        self.state = state
        for itm in pendingCells {
          self.activeCells.set(key: itm.key, value: itm.value)
        }
        self.fixContentInset(interactive: false)
        if self.loaded {
          if indexPaths.count > 0 {
            self.node.performBatch(animated: false, updates: {
              self.node.insertItems(at: indexPaths)
            }, completion: nil)
          }
          self.node.reloadSections(IndexSet(integer: 2))
          if self.batchContext != nil {
            DispatchQueue.main.async {
              self.batchContext?.completeBatchFetching(true)
              self.batchContext = nil
            }
          }
        }
        end = DispatchTime.now()
        nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds
        timeInterval = nanoTime / 1_000_000
        print("Time to complete inited: \(timeInterval) ms")
      }
    }
  }
  
  func onAdded(index: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      print("onAdded: " + state.items[index].key)
      let ex = self.activeCells.get(key: state.items[index].key)
      if ex != nil {
        fatalError("Item already exists!")
      }
      let cell = RNAsyncCell(spec: state.items[index].config, context: self.context)
      self.activeCellsStrong[state.items[index].key] = cell
      
      DispatchQueue.main.async {
        self.node.performBatchUpdates({
          self.state = state
          self.activeCells.set(key: state.items[index].key, value: cell)
          self.node.insertItems(at: [IndexPath(row: index, section: 1)])
        }, completion: nil)
      }
    }
  }
  
  func onMoved(from: Int, to: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      DispatchQueue.main.async {
        self.node.performBatchUpdates({
          self.state = state
          self.node.moveItem(at: IndexPath(item: from, section: 1), to: IndexPath(item: to, section: 1))
        }, completion: nil)
      }
    }
  }
  
  func onUpdated(index: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      print("onUpdated: " + state.items[index].key)
      let c = self.activeCellsStrong[state.items[index].key]!
      c.setSpec(spec: state.items[index].config)
      DispatchQueue.main.async {
        self.state = state
      }
    }
  }
  
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      let myGroup = DispatchGroup()
      var pendingCells: [String: RNAsyncCell] = [:]
      let lockObj = NSObject()
      for i in from..<from+count {
        myGroup.enter()
        DispatchQueue.global(qos: DispatchQoS.QoSClass.userInitiated).async {
          let itm = state.items[i]
          openland.lock(lockObj, blk: {
            let ex = self.activeCells.get(key: itm.key)
            if ex != nil {
              fatalError("Item already exists: \(itm.key)")
            }
          })
          let cell = RNAsyncCell(spec: itm.config, context: self.context)
          openland.lock(lockObj, blk: {
            self.activeCellsStrong[itm.key] = cell
            pendingCells[itm.key] = cell
          })
          myGroup.leave()
        }
      }
      myGroup.wait()
      
      DispatchQueue.main.async {
        self.node.performBatch(animated: false, updates: {
          let wasCompleted = self.state.completed
          self.state = state
          for itm in pendingCells {
            self.activeCells.set(key: itm.key, value: itm.value)
          }
          if count > 0 {
            var paths: [IndexPath] = []
            for i in from..<from+count {
              paths.append(IndexPath(item: i, section: 1))
            }
            self.node.insertItems(at: paths)
          }
          if wasCompleted != state.completed {
            self.node.reloadSections(IndexSet(integer: 2))
          }
          if self.batchContext != nil {
            DispatchQueue.main.async {
              self.batchContext?.completeBatchFetching(true)
              self.batchContext = nil
            }
          }
        }, completion: nil)
      }
    }
  }
  
  func onCompleted(state: RNAsyncDataViewState) {
    self.queue.async {
      DispatchQueue.main.async {
        self.node.performBatch(animated: false, updates: {
          self.state = state
          self.node.reloadSections(IndexSet(integer: 2))
          if self.batchContext != nil {
            DispatchQueue.main.async {
              self.batchContext?.completeBatchFetching(true)
              self.batchContext = nil
            }
          }
        }, completion: nil)
      }
    }
  }
  
  func onRemoved(index: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      self.node.performBatch(animated: false, updates: {
        self.state = state
        self.node.deleteItems(at: [IndexPath(item: index, section: 1)])
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
    if self.state.inited {
      self.dataView.loadMore()
    }
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
  
  func collectionNode(_ collectionNode: ASCollectionNode, constrainedSizeForItemAt indexPath: IndexPath) -> ASSizeRange {
    return ASSizeRange(min: CGSize(width: self.bounds.size.width, height: 0), max: CGSize(width: self.bounds.size.width, height: 10000))
  }
  
  func collectionNode(_ collectionNode: ASCollectionNode, nodeBlockForItemAt indexPath: IndexPath) -> ASCellNodeBlock {
    if self.dataView == nil {
      fatalError()
    }
    if indexPath.section == 1 {
      let d = self.state.items[indexPath.row]
      let cached = self.activeCells.get(key: d.key)
      return { () -> ASCellNode in
        if cached == nil {
          fatalError("Unable to find cell: " + d.key)
        }
        return cached!
      }
    } else if indexPath.section == 2 {
      let hideLoader = self.state.completed || !self.state.inited
      let w = self.bounds.size.width
      return { () -> ASCellNode in
        let res = ASCellNode()
        res.automaticallyManagesSubnodes = true
        res.layoutSpecBlock = { node, constrainedSize in
          let res = ASStackLayoutSpec()
          res.direction = ASStackLayoutDirection.vertical
          res.alignItems = ASStackLayoutAlignItems.center
          res.justifyContent = ASStackLayoutJustifyContent.center
          if !hideLoader {
            res.child = RNAsyncLoadingIndicator()
          }
          res.style.width = ASDimension(unit: ASDimensionUnit.points, value: w)
          res.style.height = ASDimension(unit: ASDimensionUnit.points, value: 64.0)
          return res
        }
        res.layoutThatFits(range)
        return res
      }
    } else if indexPath.section == 0 {
      let padding = self.headerPadding
      let w = self.bounds.size.width
      return { () -> ASCellNode in
        let res = ASCellNode()
        res.automaticallyManagesSubnodes = true
        res.layoutSpecBlock = { node, constrainedSize in
          let res = ASStackLayoutSpec()
          res.direction = ASStackLayoutDirection.vertical
          res.alignItems = ASStackLayoutAlignItems.center
          res.justifyContent = ASStackLayoutJustifyContent.center
          res.style.width = ASDimension(unit: ASDimensionUnit.points, value: w)
          res.style.height = ASDimension(unit: ASDimensionUnit.points, value: CGFloat(padding))
          return res
        }
        res.layoutThatFits(range)
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
