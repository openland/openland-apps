package com.openland.react

import android.content.Context
import android.graphics.drawable.AnimatedVectorDrawable
import android.util.DisplayMetrics
import android.util.Log
import android.view.View
import com.facebook.react.uimanager.ThemedReactContext
import android.view.ViewGroup
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.jrummyapps.android.widget.TwoDScrollView
import com.openland.app.R


fun convertDpToPixel(dp: Float, context: Context): Float {
    return dp * (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
}

class TwoDScrollViewManager : ViewGroupManager<ViewGroup>() {

    override fun getName(): String {
        return "AndroidTwoDScrollView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): ViewGroup {
        return TwoDScrollViewMeasure(reactContext)
    }

    @ReactProp(name = "containerWidth")
    fun setContainerWidth(view: View, containerWidth: Int) {
        view.setTag(R.id.width, convertDpToPixel(containerWidth.toFloat(), view.context).toInt())
    }

    @ReactProp(name = "containerHeight")
    fun setContainerHeight(view: View, containerHeight: Int) {
        view.setTag(R.id.height, convertDpToPixel(containerHeight.toFloat(), view.context).toInt())
    }

    override fun receiveCommand(root: ViewGroup, commandId: String, args: ReadableArray?) {
        Log.d("receiveCommand", commandId)
        when(commandId){
            "scrollTo" -> {
                (root as TwoDScrollViewMeasure).scrollTo(args!!.getInt(1), args.getInt(0))
            }
        }
    }
}

class TwoDScrollViewMeasure(context: Context) : TwoDScrollView(context) {


// can't use MeasureSpec.UNSPECIFIED - react will crash
 override fun measureChild(child: View, parentWidthMeasureSpec: Int, parentHeightMeasureSpec: Int) {
     var width = getTag(R.id.width)
     var height= getTag(R.id.height)
     width = if (width is Int) width else  1000000000
     height = if (height is Int) height else  1000000000

     Log.d("measureChild",  "" + width +" | "+ height)

     val childMeasureWidthSpec: Int = MeasureSpec.makeMeasureSpec(width, MeasureSpec.AT_MOST)
     val childMeasureHeightSpec: Int = MeasureSpec.makeMeasureSpec(height, MeasureSpec.AT_MOST)
     child.measure(childMeasureWidthSpec, childMeasureHeightSpec)
 }

 override fun measureChildWithMargins(child: View, parentWidthMeasureSpec: Int, widthUsed: Int, parentHeightMeasureSpec: Int, heightUsed: Int) {
     var width = getTag(R.id.width)
     var height= getTag(R.id.height)
     width = if (width is Int) width else  1000000000
     height = if (height is Int) height else  1000000000

     Log.d("measureChildWithMargins",  "" + width +" | "+ height)

     val childMeasureWidthSpec: Int = MeasureSpec.makeMeasureSpec(width, MeasureSpec.AT_MOST)
     val childMeasureHeightSpec: Int = MeasureSpec.makeMeasureSpec(height, MeasureSpec.AT_MOST)
     child.measure(childMeasureWidthSpec, childMeasureHeightSpec)
 }

}
