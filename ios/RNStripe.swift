//
//  RNSWindowManager.swift
//  openland
//
//  Created by Steve Korshakov on 10/21/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import Stripe

@objc(RNStripeCardView)
class RNStripeCardView: RCTView {
  let input = STPPaymentCardTextField()
  
  @objc override init(frame: CGRect) {
    super.init(frame: frame);
    self.addSubview(input);
    input.postalCodeEntryEnabled = true
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    input.frame = frame
  }
  
  @objc func setCallbackKey(_ key: String) {
    RNStripe.views.setObject(self, forKey: key as NSString)
  }
}

@objc(RNStripeCardViewManager)
class RNStripeCardViewManager: RCTViewManager {
  
  override func view() -> UIView! {
    return RNStripeCardView()
  }
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
}

@objc(RNStripe)
class RNStripe: RCTEventEmitter, STPAuthenticationContext {
  
  public static var views = NSMapTable<NSString, RNStripeCardView>()
  let controller = RCTPresentedViewController()
  
  func authenticationPresentingViewController() -> UIViewController {
    return self.controller!
  }
  

  @objc(confirmSetupIntent:clientSecret:)
  func confirmSetupIntent(callbackKey: String, clientSecret: String) {
    let view = RNStripe.views.object(forKey: callbackKey as NSString)
    if (view == nil) {
      return
    }
    
    // Collect card details
    let cardParams = view!.input.cardParams
    let paymentMethodParams = STPPaymentMethodParams(card: cardParams, billingDetails: STPPaymentMethodBillingDetails(), metadata: nil)
    let setupIntentParams = STPSetupIntentConfirmParams(clientSecret: clientSecret)
    setupIntentParams.paymentMethodParams = paymentMethodParams
    
    let paymentHandler = STPPaymentHandler.shared()
    paymentHandler.confirmSetupIntent(withParams: setupIntentParams, authenticationContext: self) { status, setupIntent, error in
        switch (status) {
        case .failed:
          var dict:[String:Any] = [:]
          dict["clientSecret"] = clientSecret
          dict["status"] = "failed"
          dict["message"] = "We are unable to authenticate your payment method. Please choose a different payment method and try again."
          self.sendEvent(withName: "setup_intent", body: dict)
          break
        case .canceled:
          var dict:[String:Any] = [:]
          dict["clientSecret"] = clientSecret
          dict["status"] = "failed"
          self.sendEvent(withName: "setup_intent", body: dict)
          break
        case .succeeded:
          var dict:[String:Any] = [:]
          dict["clientSecret"] = clientSecret
          dict["id"] = setupIntent!.paymentMethodID!
          dict["status"] = "success"
          self.sendEvent(withName: "setup_intent", body: dict)
          break
        @unknown default:
            fatalError()
            break
        }
    }
  }
  
  override func supportedEvents() -> [String]! {
    return ["setup_intent"]
  }
}
