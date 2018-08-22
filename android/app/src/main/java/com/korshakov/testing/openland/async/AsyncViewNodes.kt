package com.korshakov.testing.openland.async

import android.content.res.Resources
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.drawee.generic.RoundingParams
import com.facebook.litho.*
import com.facebook.litho.fresco.FrescoImage
import com.facebook.litho.widget.Image
import com.facebook.litho.widget.SolidColor
import com.facebook.litho.widget.Text
import com.facebook.yoga.YogaAlign
import com.facebook.yoga.YogaEdge
import com.facebook.yoga.YogaJustify

fun resolveStyle(context: ComponentContext, component: Component.Builder<*>, style: AsyncViewStyle): Component {
    var res = component

    style.width?.let { res.widthDip(it) }
    style.height?.let { res.heightDip(it) }
    style.flexBasis?.let { res.flexBasisDip(it) }
    style.flexGrow.let { res.flexGrow(it) }
    style.flexShrink.let { res.flexShrink(it) }
    style.alignSelf?.let {
        res.alignSelf(when (it) {
            AsyncFlexAlignSelf.start -> YogaAlign.FLEX_START
            AsyncFlexAlignSelf.end -> YogaAlign.FLEX_END
            AsyncFlexAlignSelf.center -> YogaAlign.CENTER
            AsyncFlexAlignSelf.stretch -> YogaAlign.STRETCH
        })
    }

    style.marginTop?.let { res.marginDip(YogaEdge.TOP, it) }
    style.marginBottom?.let { res.marginDip(YogaEdge.BOTTOM, it) }
    style.marginLeft?.let { res.marginDip(YogaEdge.LEFT, it) }
    style.marginRight?.let { res.marginDip(YogaEdge.RIGHT, it) }

//    style.borderRadius?.let {
//        res = res.border(Border.create(context).radiusDip(it).build())
//    }

    style.backgroundColor?.let {
        if (style.borderRadius != null) {
            res.background(BackgroundSolidColorDrawable(it, Resources.getSystem().displayMetrics.density * style.borderRadius!!))
        } else {
            res.backgroundColor(it)
        }
    }

    return res.build()
}

fun resolveNode(context: ComponentContext, src: AsyncViewSpec): Component {
    return if (src is AsyncFlexSpec) {
        val alignItems: YogaAlign = when (src.alignItems) {
            AsyncFlexAlignItems.start -> YogaAlign.FLEX_START
            AsyncFlexAlignItems.end -> YogaAlign.FLEX_END
            AsyncFlexAlignItems.center -> YogaAlign.CENTER
            AsyncFlexAlignItems.stretch -> YogaAlign.STRETCH
        }

        val justifyContent: YogaJustify = when (src.justifyContent) {
            AsyncFlexJustifyContent.start -> YogaJustify.FLEX_START
            AsyncFlexJustifyContent.end -> YogaJustify.FLEX_END
            AsyncFlexJustifyContent.center -> YogaJustify.CENTER
        }

        if (src.direction == AsyncFlexDirection.row) {
            val res = Row.create(context)
                    .key(src.key)
                    .alignItems(alignItems)
                    .justifyContent(justifyContent)

            for (c in src.children) {
                res.child(resolveNode(context, c))
            }
            resolveStyle(context, res, src.style)
        } else {
            val res = Column.create(context)
                    .key(src.key)
                    .alignItems(alignItems)
                    .justifyContent(justifyContent)
            for (c in src.children) {
                res.child(resolveNode(context, c))
            }
            resolveStyle(context, res, src.style)
        }
    } else if (src is AsyncTextSpec) {
        val res = Text.create(context)
                .key(src.key)
                .text(src.text)
                .textSizeDip(src.fontSize)
                .textColor(src.color)
                .shouldIncludeFontPadding(false)

        // TODO: Handle styles
        resolveStyle(context, res, src.style)
    } else if (src is AsyncImageSpec) {
        val controller = Fresco.newDraweeControllerBuilder()
                .setUri(src.url)
                .build()

        var res = FrescoImage.create(context)
                .controller(controller)
                .fadeDuration(0)

        if (src.style.borderRadius != null) {
            res = res.roundingParams(RoundingParams.fromCornersRadius(Resources.getSystem().displayMetrics.density * src.style.borderRadius!!))
        }
        resolveStyle(context, res, src.style)
    } else {
        error("Unsupported spec")
    }
}