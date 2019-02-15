package com.openland.react.keyboard

import android.app.Activity
import android.content.Context
import android.graphics.Point
import android.graphics.Rect
import android.view.Gravity
import android.view.View
import android.view.ViewTreeObserver
import android.view.WindowManager
import android.view.inputmethod.InputMethodManager
import android.widget.PopupWindow
import com.openland.app.R

/**
 * Created by Cristian Holdunu on 12/01/2019.
 */
object KeyboardInfo {
    const val HEIGHT_NOT_COMPUTED = -1
    const val STATE_UNKNOWN = -1
    const val STATE_CLOSED = 0
    const val STATE_OPENED = 1

    /**
     * Cached keyboard height. This will keep the last keyboard height value and not
     * it's current height
     */
    var keyboardHeight = HEIGHT_NOT_COMPUTED

    /**
     * Real time keyboard state
     */
    var keyboardState = STATE_UNKNOWN
}

/**
 * Created by Cristian Holdunu on 11/01/2019.
 */
class KeyboardHeightProvider(val activity: Activity) : PopupWindow(activity) {

    private var resizableView: View
    private var parentView: View
    private var lastKeyboardHeight = -1

    private var keyboardListeners = ArrayList<KeyboardListener>()

    init {
        contentView = View.inflate(activity, R.layout.keyboard_popup, null)
        resizableView = contentView.findViewById(R.id.keyResizeContainer)
        softInputMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE or
                WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE
        inputMethodMode = PopupWindow.INPUT_METHOD_NEEDED

        width = 0
        height = WindowManager.LayoutParams.MATCH_PARENT

        parentView = activity.findViewById(android.R.id.content)
        resizableView.viewTreeObserver.addOnGlobalLayoutListener(getGlobalLayoutListener())
    }

    private fun getGlobalLayoutListener() = ViewTreeObserver.OnGlobalLayoutListener {
        computeKeyboardState()
    }

    private fun computeKeyboardState() {
        val screenSize = Point()
        activity.windowManager.defaultDisplay.getSize(screenSize)
        val rect = Rect()
        resizableView.getWindowVisibleDisplayFrame(rect)
        val orientation = activity.resources.configuration.orientation

        val keyboardHeight = screenSize.y + topCutoutHeight - rect.bottom
        KeyboardInfo.keyboardState = if (keyboardHeight > 0) KeyboardInfo.STATE_OPENED else KeyboardInfo.STATE_CLOSED
        if (keyboardHeight > 0) {
            KeyboardInfo.keyboardHeight = keyboardHeight
        }
        if (keyboardHeight != lastKeyboardHeight)
            notifyKeyboardHeightChanged(keyboardHeight, orientation)
        lastKeyboardHeight = keyboardHeight
    }

    private val topCutoutHeight: Int
        get() {
            val decorView = activity.window.decorView ?: return 0
            var cutOffHeight = 0
//            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
//                val windowInsets = decorView.rootWindowInsets
//                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
//                    val displayCutout = windowInsets.displayCutout
//                    if (displayCutout != null) {
//                        val list = displayCutout.boundingRects
//                        for (rect in list) {
//                            if (rect.top == 0) {
//                                cutOffHeight += rect.bottom - rect.top
//                            }
//                        }
//                    }
//                }
//
//            }
            return cutOffHeight
        }

    fun addKeyboardListener(listener: KeyboardListener) {
        keyboardListeners.add(listener)
    }

    fun removeKeyboardListener(listener: KeyboardListener) {
        keyboardListeners.remove(listener)
    }

    private fun notifyKeyboardHeightChanged(height: Int, orientation: Int) {
        keyboardListeners.forEach {
            it.onHeightChanged(height)
        }
    }

    /**
     * Start the KeyboardHeightProvider, this must be called after the onResume of the Activity.
     * PopupWindows are not allowed to be registered before the onResume has finished
     * of the Activity.
     */
    fun start() {
        if (!isShowing && parentView.windowToken != null) {
            showAtLocation(parentView, Gravity.NO_GRAVITY, 0, 0)
        }
    }

    /**
     * Close the keyboard height provider,
     * this provider will not be used anymore.
     */
    fun close() {
        this.keyboardListeners.clear()
        dismiss()
    }

    fun hideKeyboard() {
        val imm = activity.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(parentView.windowToken, 0)
    }

    interface KeyboardListener {
        fun onHeightChanged(height: Int)
    }
}