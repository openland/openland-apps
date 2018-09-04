package com.korshakov.testing.openland.async.views

import android.graphics.Canvas
import android.graphics.ColorFilter
import android.graphics.Paint
import android.graphics.drawable.Drawable

class BackgroundSolidColorDrawable(val color: Int, val radius: Float) : Drawable() {
    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)

    init {
        this.paint.color = color
    }

    override fun draw(canvas: Canvas) {
        canvas.drawRoundRect(
                this.bounds.left.toFloat(),
                this.bounds.top.toFloat(),
                this.bounds.right.toFloat(),
                this.bounds.bottom.toFloat(),
                radius,
                radius,
                this.paint)
    }

    override fun setAlpha(alpha: Int) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getOpacity(): Int {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun setColorFilter(colorFilter: ColorFilter?) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}