package com.openland.react

import android.content.res.Configuration
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import android.view.LayoutInflater
import com.openland.app.R

class SplashViewManager : SimpleViewManager<View>() {

    override fun getName(): String {
        return "AndroidSplashView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): View {
        val activity = if (reactContext.currentActivity != null) reactContext.currentActivity!! else reactContext
        val currentMode = activity.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
        val isDark = currentMode == Configuration.UI_MODE_NIGHT_YES
        val inflater = LayoutInflater.from(activity)
        return inflater.inflate(if (isDark) R.layout.splash_dark else R.layout.splash, null)
    }
}