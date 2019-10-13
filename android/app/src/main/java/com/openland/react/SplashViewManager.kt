package com.openland.react

import android.content.Context
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
        val inflater = reactContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

        return inflater.inflate(R.layout.splash, null)
    }
}