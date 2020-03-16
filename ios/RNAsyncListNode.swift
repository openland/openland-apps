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
  
  private var state: RNAsyncDataViewState = RNAsyncDataViewState(items: [], completed: false, completedForward: false, inited: false, anchor: nil)
  private var headerPadding: Float = 0.0
  private var overflowColor: UInt64? = nil
  private var loaderColor: UInt64 = 0
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
  private var loadingCell = RNLoadingCell()
  private var loadingCellTop = RNLoadingCell()
  
  private var loadingCellTopVisible = false;
  
  private var viewLoaded = false
  private var keyboardSubscription: (() -> Void)?
  private var isDragging = false
  private var keyboardHeight: CGFloat = 0.0
  private var keyboardAcHeight: CGFloat = 0.0
  // This context references parent view and can create reference cycle
  private var keyboardCtx: String? = nil
  private var overscrollCompensation = false
  private var isApplying = false
  private var didRenderContent = false
  private var animated = false
  
  private var applyModes: [String] = []
  
  init(parent: RNAsyncListView) {
    self.parent = parent
    self.queue = DispatchQueue(label: "rn-async-node")
    let layout = ChatFlowLayout()
    layout.minimumLineSpacing = 0.0
    layout.minimumInteritemSpacing = 0.0
    layout.scrollDirection = UICollectionView.ScrollDirection.vertical
    self.node = ASCollectionNode(collectionViewLayout: layout)
    self.node.alwaysBounceVertical = true
    self.node.backgroundColor = UIColor.clear
    super.init()
    addSubnode(node)
    self.node.dataSource = self
    self.node.delegate = self
    
  }
  
  deinit {
    self.keyboardSubscription?()
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
    if #available(iOS 13.0, *) {
      self.node.view.automaticallyAdjustsScrollIndicatorInsets = false
    }
    self.node.view.alwaysBounceVertical = true
    self.dataViewUnsubscribe = self.dataView.watch(delegate: self)
    self.viewLoaded = true
    
    
    self.keyboardCtx = (self.parent.resolveKeyboardContextKey()?.keyboardContextKey) ?? "default"
    self.keyboardSubscription = RNAsyncKeyboardManager.sharedInstance.watch(delegate: self, ctx: self.keyboardCtx)
    
    
  }
  
  func keyboardWillChangeHeight(ctx: String, kbHeight: CGFloat, acHeight: CGFloat) {
    if self.keyboardCtx == ctx {
      if self.node.inverted {
         self.keyboardHeight = kbHeight + acHeight
         if self.keyboardAcHeight != acHeight {
           self.keyboardAcHeight = acHeight
           self.fixContentInset(interactive: false)
         }

         print("keyboardWillChangeHeight")
         // self.fixContentInset(interactive: true)
      }
    }
  }
  
  func keyboardWillShow(ctx: String, kbHeight: CGFloat, acHeight: CGFloat, duration: Double, curve: Int) {
    if self.keyboardCtx == ctx {
      self.keyboardVisible = true
      self.keyboardHeight = kbHeight + acHeight
      self.keyboardAcHeight = acHeight
      print("keyboardWillShow")
      UIView.animate(withDuration: duration, delay: 0.0, options: UIView.AnimationOptions(rawValue: UInt(curve)), animations: {
        self.fixContentInset(interactive: false)
      }, completion: nil)
    }
  }
  
  func keyboardWillHide(ctx: String, kbHeight: CGFloat, acHeight: CGFloat, duration: Double, curve: Int) {
     if self.keyboardCtx == ctx {
      self.keyboardVisible = false
      self.keyboardHeight = kbHeight + acHeight
      self.keyboardAcHeight = acHeight
      print("keyboardWillHide")
      UIView.animate(withDuration: duration, delay: 0.0, options: [UIView.AnimationOptions(rawValue: UInt(curve)), UIView.AnimationOptions.beginFromCurrentState], animations: {
        self.fixContentInset(interactive: false)
      }, completion: nil)
    }
  }
  
  private func fixContentInset(interactive: Bool) {
    let currentInset = self.node.inverted ? self.node.contentInset.top : self.node.contentInset.bottom
    let newInset = max(self.keyboardHeight, CGFloat(self.bottomInset))
    let insetsDiff = currentInset - newInset
    let originalOffset = self.node.contentOffset
    let size = self.node.view.contentSize
    if self.node.inverted {
      var inset = self.node.contentInset
      inset.top = newInset
      inset.bottom = CGFloat(self.topInset)
      self.node.contentInset = inset
    } else {
      self.node.contentInset.bottom = newInset
      self.node.contentInset.top = CGFloat(self.topInset)
    }
    
    if self.node.inverted && !interactive {
      print("insetsDiff \(insetsDiff)")
      print("keyboardHeight \(self.keyboardHeight)")
      print("bottomInset \(self.bottomInset)")
      print("originalOffset.y \(originalOffset.y)")
      print("newInset \(newInset)")
      print("currentInset \(currentInset)")
      print("contentSize.height \(size.height)")
      if insetsDiff < 0 {
        self.node.contentOffset = CGPoint(x: originalOffset.x, y: originalOffset.y + insetsDiff)
      }
    }
  }
  
  public func setApplyModes(_ applyModes: [String]){
    if !self.loaded {
      self.applyModes = applyModes
    } else {
      if !self.applyModes.elementsEqual(applyModes) {
        DispatchQueue.main.async {
          self.node.performBatch(animated: false, updates: {
            self.applyModes = applyModes
            self.node.reloadSections(IndexSet(integer: 1))
          }, completion: nil)
        }
      }
    }
  }
  
  public func setOverscrollCompensation(_ enabled: Bool) {
    self.overscrollCompensation = enabled
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
  
  func setAnimated(animated: Bool) {
    self.animated = animated
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
  
  var prevScroll: CGFloat = 0.0
  var settingScroll = false
  
  func scrollViewDidScroll(_ scrollView: UIScrollView) {
    if(settingScroll){
      return
    }
    
    // Fixing scrollbars
    let bottomInsetCalculated = max(self.keyboardHeight, CGFloat(self.bottomInset))
    if !self.node.inverted {
      // Adjust scrollbars for overscrolling
      if self.overscrollCompensation {
        let overscroll = max(-(scrollView.contentOffset.y + CGFloat(self.topInset)), 0)
        self.node.view.scrollIndicatorInsets = UIEdgeInsets(top: CGFloat(self.topInset) + overscroll, left: 0.0, bottom: CGFloat(bottomInsetCalculated), right: 0.0)
      } else {
        self.node.view.scrollIndicatorInsets = UIEdgeInsets(top: CGFloat(self.topInset), left: 0.0, bottom: CGFloat(bottomInsetCalculated), right: 0.0)
      }
    } else {
      self.node.view.scrollIndicatorInsets = UIEdgeInsets(top: CGFloat(bottomInsetCalculated), left: 0.0, bottom: CGFloat(self.topInset), right: 0.0)
    }
    
    // Forward scroll offset
    var offsetX = scrollView.contentOffset.x
    var offsetY = scrollView.contentOffset.y + CGFloat(self.topInset)
    
    if self.isApplying && offsetY == 0 {
      // autofix
      offsetY = self.prevScroll
      scrollView.contentOffset.y = offsetY - CGFloat(self.topInset)
    } else {
      self.prevScroll = offsetY
    }
    
    if(scrollView.contentOffset.y < 1000){
      self.dataView.loadMoreForward()
    }
    
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
            self.node.reloadSections(IndexSet(integer: 2))
          }, completion: nil)
        }
      }
    }
  }
  
  func setOverflowColor(color: UInt64) {
    if(!self.didRenderContent){
      self.backgroundColor = resolveColorR(color)
    }
    if !self.loaded {
      self.overflowColor = color
      self.loadingCell.overflowColor = color
      self.loadingCellTop.overflowColor = color
    } else {
      if self.overflowColor != color {
        DispatchQueue.main.async {
          self.node.performBatch(animated: false, updates: {
            self.overflowColor = color
            self.node.reloadSections(IndexSet(integer: 0))
            self.node.reloadSections(IndexSet(integer: 2))
          }, completion: nil)
        }
      }
    }
  }
  
  func setLoaderColor(color: UInt64) {
    if !self.loaded {
      self.loaderColor = color
      self.loadingCell.loaderColor = color
      self.loadingCellTop.loaderColor = color
    } else {
      if self.loaderColor != color {
        DispatchQueue.main.async {
          self.node.performBatch(animated: false, updates: {
            self.loaderColor = color
            self.loadingCell.loaderColor = color
            self.loadingCellTop.loaderColor = color
            self.node.reloadSections(IndexSet(integer: 0))
            self.node.reloadSections(IndexSet(integer: 2))
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
  
  
  func checkTopLoader(){
    let loaderNeeded = !self.state.completedForward && self.state.items.count > 0;
    self.node.performBatch(animated: false, updates: {
      if(loaderNeeded && !self.loadingCellTopVisible){
        self.loadingCellTopVisible = true
        self.loadingCellTop.loading = true
        self.node.insertItems(at: [IndexPath(row: 0, section: 0)])
      }else if(!loaderNeeded && self.loadingCellTopVisible){
        self.loadingCellTopVisible = false
        self.loadingCellTop.loading = false
        self.node.deleteItems(at: [IndexPath(row: 0, section: 0)])
      }
    }, completion: nil)
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
      self.activeCells.clear();
      for itm in state.items {
        myGroup.enter()
        DispatchQueue.global(qos: DispatchQoS.QoSClass.userInitiated).async {
          let ex = self.activeCells.get(key: itm.key)
          if ex != nil {
            fatalError("Item already exists!")
          }
          let cell = RNAsyncCell(spec: itm.config, context: self.context, applyModes: self.applyModes)
          openland.lock(lockObj, blk: {
            self.activeCellsStrong[itm.key] = cell
            pendingCells[itm.key] = cell
          })
          myGroup.leave()
        }
      }
      myGroup.wait()
      self.didRenderContent = true
      self.backgroundColor = UIColor.clear
      
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
        // clean up in case of reload
        var toDelete: [IndexPath] = []
        if(self.state.items.count > 0){
          toDelete = (0..<self.state.items.count).map({ (i) -> IndexPath in
            IndexPath(row: i, section: 1)
          })
        }
        self.state = state
        for itm in pendingCells {
          self.activeCells.set(key: itm.key, value: itm.value)
        }
        self.fixContentInset(interactive: false)
        self.loadingCell.loading = !state.completed
        self.loadingCellTop.loading = !state.completedForward
        if self.loaded {
          if indexPaths.count + toDelete.count > 0 {
            self.node.performBatch(animated: false, updates: {
              self.node.deleteItems(at:toDelete)
              self.node.insertItems(at: indexPaths)
            }, completion: nil)
            self.checkTopLoader()
          }
          
          self.node.performBatch(animated: false, updates: {
            self.node.reloadSections(IndexSet(integer: 2))
            self.node.reloadSections(IndexSet(integer: 0))
          }, completion: { v in
            if(state.anchor == nil){
             self.node.scrollToItem(at: IndexPath(item: 0, section: 1), at: .top, animated: false)
            }
          })
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
      let cell = RNAsyncCell(spec: state.items[index].config, context: self.context, applyModes: self.applyModes)
      cell.applyModes = self.applyModes
      self.activeCellsStrong[state.items[index].key] = cell
      
      DispatchQueue.main.async {
        self.node.performBatch(animated: self.animated, updates: {
          self.state = state
          self.activeCells.set(key: state.items[index].key, value: cell)
          self.node.insertItems(at: [IndexPath(row: index, section: 1)])
          self.checkTopLoader()
        }, completion: nil)
      }
    }
  }
  
  func onMoved(from: Int, to: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      DispatchQueue.main.async {
        self.node.performBatch(animated: self.animated, updates: {
          self.state = state
          self.node.moveItem(at: IndexPath(item: from, section: 1), to: IndexPath(item: to, section: 1))
        }, completion: nil)
      }
    }
  }
  
  func onUpdated(index: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      let myGroup = DispatchGroup()
      myGroup.enter();
      DispatchQueue.global(qos: DispatchQoS.QoSClass.userInitiated).async {
        let c = self.activeCellsStrong[state.items[index].key]
        if(c == nil){
          return
        }
        c!.applyModes = self.applyModes
        c!.setSpec(spec: state.items[index].config)
         myGroup.leave();
      }
      myGroup.wait()
      DispatchQueue.main.async {
        self.node.performBatch(animated: false, updates: {
          self.state = state
          self.node.reloadItems(at: [IndexPath(item: index, section: 1)])
        }, completion: nil)
      }
    }
  }
  
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState) {
    self.queue.async {
      let myGroup = DispatchGroup()
      var pendingCells: [String: RNAsyncCell] = [:]
      let lockObj = NSObject()
      for i in from..<from+count {
        print(i, from, count, state.items.count)
        myGroup.enter()
        DispatchQueue.global(qos: DispatchQoS.QoSClass.userInitiated).async {
          let itm = state.items[i]
          openland.lock(lockObj, blk: {
            let ex = self.activeCells.get(key: itm.key)
            if ex != nil {
              fatalError("Item already exists: \(itm.key)")
            }
          })
          let cell = RNAsyncCell(spec: itm.config, context: self.context, applyModes: self.applyModes)
          openland.lock(lockObj, blk: {
            self.activeCellsStrong[itm.key] = cell
            pendingCells[itm.key] = cell
          })
          myGroup.leave()
        }
      }
      myGroup.wait()
      
      DispatchQueue.main.async {
        self.loadingCell.loading = !state.completed
        self.checkTopLoader()
        self.node.performBatch(animated: false, updates: {
          let wasCompleted = self.state.completed
          self.state = state
          for itm in pendingCells {
            itm.value.applyModes = self.applyModes
            self.activeCells.set(key: itm.key, value: itm.value)
          }
          if count > 0 {
            var paths: [IndexPath] = []
            for i in from..<from+count {
              paths.append(IndexPath(item: i, section: 1))
            }
            self.node.insertItems(at: paths)
            self.checkTopLoader()
          }
          if self.batchContext != nil {
            DispatchQueue.main.async {
              self.batchContext?.completeBatchFetching(true)
              self.batchContext = nil
            }
          }
          self.isApplying = true
        }, completion: { v in
          self.isApplying = false
        })
      }
    }
  }
  
  func onCompleted(state: RNAsyncDataViewState) {
    self.queue.async {
      DispatchQueue.main.async {
        self.loadingCell.loading = false
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
  
  func onCompletedForward(state: RNAsyncDataViewState) {
    self.queue.async {
      DispatchQueue.main.async {
        self.state = state
        self.checkTopLoader()
      }
    }
  }
  
  func onRemoved(index: Int, state: RNAsyncDataViewState) {
    if(self.state.items.count > index){
      // TODO: investigate
      // items could be empty here - wtf
      // looks like other async update affects it, but it should not clear items
      self.activeCellsStrong.removeValue(forKey: self.state.items[index].key)
    }
    self.queue.async {
      self.activeCells.remove(key: self.state.items[index].key)
      DispatchQueue.main.async {
        self.node.performBatch(animated: self.animated, updates: {
          self.state = state
          self.node.deleteItems(at: [IndexPath(item: index, section: 1)])
          self.checkTopLoader()
        }, completion: nil)
      }
    }
  }
  
  func onScrollToRequested(index: Int) {
    self.queue.async {
      DispatchQueue.main.async {
        print("boom", "onScrollToRequested", "list", index, self.state.items.count)
        self.settingScroll = true
        self.node.scrollToItem(at: IndexPath(item: index, section: 1), at: .bottom, animated: false)
        self.settingScroll = false
      }
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
    } else if section == 0 {
      return self.loadingCellTopVisible ? 1 : 0
    }else {
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
      let applyModes = self.applyModes
      let index = self.state.items.firstIndex(where: { item -> Bool in
        item.key == d.key
      }) ?? -1;
      
      /* NO "self" references here!!!! Bevare retantion cycles! */
      return { () -> ASCellNode in
        if cached == nil {
          fatalError("Unable to find cell: " + d.key)
        }
        cached?.applyModes(modesToApply: applyModes)
        return cached!
      }
    } else if indexPath.section == 2 {
      self.loadingCell.loaderColor = self.loaderColor
      let n = self.loadingCell
      /* NO "self" references here!!!! Bevare retantion cycles! */
      return { () -> ASCellNode in
        n.layoutThatFits(range)
        n.automaticallyManagesSubnodes = true
        return n
      }
    } else if indexPath.section == 0 {
      self.loadingCellTop.loaderColor = self.loaderColor
      let n = self.loadingCellTop
      print("boom", "render bottom loader",  self.state.completedForward, self.state.items.count)
      /* NO "self" references here!!!! Bevare retantion cycles! */
      return { () -> ASCellNode in
        n.layoutThatFits(range)
        n.automaticallyManagesSubnodes = true
        return n
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
