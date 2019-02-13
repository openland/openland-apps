package com.openland.react.threads

import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.devsupport.JSCHeapCapture
import com.facebook.react.modules.appstate.AppStateModule
import com.facebook.react.modules.core.ExceptionsManagerModule
import com.facebook.react.modules.core.Timing
import com.facebook.react.modules.debug.SourceCodeModule
import com.facebook.react.modules.intent.IntentModule
import com.facebook.react.modules.location.LocationModule
import com.facebook.react.modules.netinfo.NetInfoModule
import com.facebook.react.modules.network.NetworkingModule
import com.facebook.react.modules.storage.AsyncStorageModule
import com.facebook.react.modules.systeminfo.AndroidInfoModule
import com.facebook.react.modules.vibration.VibrationModule
import com.facebook.react.modules.websocket.WebSocketModule
import com.facebook.react.uimanager.ViewManager

import java.util.ArrayList
import java.util.Arrays

class ThreadBaseReactPackage(private val reactInstanceManager: ReactInstanceManager) : ReactPackage {

    override fun createNativeModules(catalystApplicationContext: ReactApplicationContext): List<NativeModule> {
        return Arrays.asList<NativeModule>(
                // Core list
                AndroidInfoModule(catalystApplicationContext),
                ExceptionsManagerModule(reactInstanceManager.devSupportManager),
                AppStateModule(catalystApplicationContext),
                Timing(catalystApplicationContext, reactInstanceManager.devSupportManager),
                UIManagerStubModule(catalystApplicationContext),
                SourceCodeModule(catalystApplicationContext),
                JSCHeapCapture(catalystApplicationContext),

                // Main list
                AsyncStorageModule(catalystApplicationContext),
                IntentModule(catalystApplicationContext),
                LocationModule(catalystApplicationContext),
                NetworkingModule(catalystApplicationContext),
                NetInfoModule(catalystApplicationContext),
                VibrationModule(catalystApplicationContext),
                WebSocketModule(catalystApplicationContext),
                ThreadSelfModule(catalystApplicationContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return ArrayList(0)
    }
}
