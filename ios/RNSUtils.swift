//
//  RNSUtils.swift
//  openland
//
//  Created by Steve Kite on 9/12/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

/*
 * Get animation slowdown coeficient in simulator to support "Slow Animations" mode.
 */
#if (arch(i386) || arch(x86_64)) && os(iOS)
@_silgen_name("UIAnimationDragCoefficient") func UIAnimationDragCoefficient() -> Float
#endif

/*
 * Resolving actual animation duration
 */
func resolveDuration(source: Double) -> Double {
  #if (arch(i386) || arch(x86_64)) && os(iOS)
  return source * Double(UIAnimationDragCoefficient())
  #else
  return source
  #endif
}
