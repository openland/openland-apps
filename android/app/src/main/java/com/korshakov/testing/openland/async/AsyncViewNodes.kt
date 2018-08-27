package com.korshakov.testing.openland.async

import android.content.res.Resources
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.drawee.generic.RoundingParams
import com.facebook.litho.*
import com.facebook.litho.fresco.FrescoImage
import com.facebook.litho.sections.SectionContext
import com.facebook.litho.sections.widget.RecyclerCollectionComponent
import com.facebook.litho.widget.Text
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.yoga.YogaAlign
import com.facebook.yoga.YogaEdge
import com.korshakov.testing.openland.async.views.BackgroundSolidColorDrawable
import com.korshakov.testing.openland.async.views.LithoFlex
import com.korshakov.testing.openland.async.views.LithoSection

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

fun resolveNode(context: ComponentContext, spec: AsyncViewSpec, reactContext: ReactContext): Component {
    return when (spec) {
        is AsyncFlexSpec -> return LithoFlex.create(context)
                .spec(spec)
                .reactContext(reactContext)
                .build()
        is AsyncTextSpec -> {
            val res = Text.create(context)
                    .key(spec.key)
                    .text(spec.text)
                    .textSizeDip(spec.fontSize)
                    .textColor(spec.color)
                    .shouldIncludeFontPadding(false)

            // TODO: Handle styles
            resolveStyle(context, res, spec.style)
        }
        is AsyncImageSpec -> {
            val controller = Fresco.newDraweeControllerBuilder()
                    .setUri(spec.url)
                    .build()

            var res = FrescoImage.create(context)
                    .controller(controller)
                    .fadeDuration(0)

            if (spec.style.borderRadius != null) {
                res = res.roundingParams(RoundingParams.fromCornersRadius(Resources.getSystem().displayMetrics.density * spec.style.borderRadius!!))
            }
            resolveStyle(context, res, spec.style)
        }
        is AsyncListSpec -> {
            val res = RecyclerCollectionComponent.create(context)
                    .disablePTR(true)
                    .section(LithoSection.create(SectionContext(context))
                            .dataModel(spec.children.toList())
                            .reactContext(reactContext))
            resolveStyle(context, res, spec.style)
        }
        else -> error("Unsupported spec")
    }
}