package com.korshakov.testing.openland.async.anim

import android.view.View
import android.view.ViewPropertyAnimator

object FastAnimationUtils {
    fun fastAnimate(view: View): ViewPropertyAnimator {
        val realAnimator = view.animate()
        val backendField = realAnimator.javaClass.declaredFields.find { it.name === "mRTBackend" }!!
        backendField.isAccessible = true
        if (backendField.get(realAnimator) != null) {
            return realAnimator
        }

        val animatorClazz = FastAnimationUtils::class.java.classLoader.loadClass("android.view.ViewPropertyAnimatorRT")
        val constructor = animatorClazz.declaredConstructors[0]
        constructor.isAccessible = true
        val animator = constructor.newInstance(view)
        backendField.set(realAnimator, animator)
        return realAnimator
    }
}