//
//  RNAsyncCell.swift
//  openland
//
//  Created by Steve Kite on 9/7/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

let range = ASSizeRange(min: CGSize(width: UIScreen.main.bounds.width, height: 0), max: CGSize(width: UIScreen.main.bounds.width, height: 10000))
let q = DispatchQueue(label: "CellUpdate", qos: .userInitiated)

class RNAsyncCell: ASCellNode {
  let context: RNAsyncViewContext
  var spec: AsyncViewSpec
  var applyModes: [String]
  
  var pendingSpec: AsyncViewSpec?
  var pendingApplyModes: [String]?
  
  var node: ASLayoutElement!
  
  let lock = NSObject()
  var updating = true;
  init(spec: AsyncViewSpec, context: RNAsyncViewContext, applyModes: [String]) {
    self.context = context
    self.spec = spec
    self.applyModes = applyModes
    super.init()
    self.node = resolveNode(spec: spec, modesToApply: self.applyModes, context: self.context)
    self.automaticallyManagesSubnodes = true
    self.setNeedsLayout()
    self.layoutThatFits(range)
  }
  
  // We are updating cell always from background thread
  func setSpec(spec: AsyncViewSpec) {
    updateNode(spec: spec, modesToApply: self.applyModes)
  }
  
  func applyModes(modesToApply: [String]){
    if(self.applyModes != modesToApply){
      self.applyModes = modesToApply
      updateNode(spec: self.spec, modesToApply: modesToApply)
    }
  }
  
  func updateNode(spec: AsyncViewSpec, modesToApply: [String]){
      openland.lock(self.lock) {
        if(self.updating || self.preDisplay){
          self.pendingApplyModes = modesToApply
          self.pendingSpec = spec
          return
        }
        self.updating = true
        q.async {
           self.spec = spec
           self.applyModes = modesToApply
           self.node = resolveNode(spec: spec, modesToApply: modesToApply, context: self.context)
           self.setNeedsLayout()
           self.layoutThatFits(range)
         }
      }
  }
  
  func updateIfPending(){
    var pendingSpec: AsyncViewSpec? = nil;
    var pendingApplyModes: [String]? = nil;
    openland.lock(self.lock) {
      if(self.pendingSpec != nil || self.pendingApplyModes != nil){
         pendingSpec = self.pendingSpec
         pendingApplyModes = self.pendingApplyModes
         self.pendingSpec = nil
         self.pendingApplyModes = nil
      }
    }
    if(pendingSpec != nil || pendingApplyModes != nil){
      self.updateNode(spec: pendingSpec ?? self.spec, modesToApply: pendingApplyModes ?? self.applyModes)
    }
  }
  
  override func layoutDidFinish() {
    DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(50)) {
         openland.lock(self.lock) {
           self.updating = false
         }
         self.updateIfPending();
     }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    let res = ASStackLayoutSpec()
    res.direction = ASStackLayoutDirection.vertical
    res.alignItems = ASStackLayoutAlignItems.stretch
    res.child = self.node
    res.style.width = ASDimension(unit: ASDimensionUnit.points, value: UIScreen.main.bounds.width)
    return res
  }
}
