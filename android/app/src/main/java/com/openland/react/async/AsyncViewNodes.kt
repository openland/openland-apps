package com.openland.react.async

import android.content.res.Resources
import com.facebook.litho.*
import com.facebook.react.bridge.ReactContext
import com.facebook.yoga.YogaAlign
import com.facebook.yoga.YogaEdge
import com.openland.react.async.views.*
import dk.madslee.imageCapInsets.utils.NinePatchBitmapFactory

fun resolveStyle(context: ComponentContext, component: Component.Builder<*>, style: AsyncViewStyle): Component {
    var res = component

    style.width?.let { res.widthDip(it) }
    style.maxWidth?.let { res.maxWidthDip(it) }
    style.height?.let { res.heightDip(it) }
    style.maxHeight?.let { res.maxHeightDip(it) }
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

    if (style.backgroundPatch != null) {
        val scale = style.backgroundPatch!!.scale
        res.background(NinePatchBitmapFactory.createNinePathWithCapInsets(
                context.resources,
                style.backgroundPatch!!.source,
                (scale * style.backgroundPatch!!.top).toInt(),
                (scale * style.backgroundPatch!!.left).toInt(),
                style.backgroundPatch!!.source!!.height - (scale * style.backgroundPatch!!.bottom).toInt(),
                style.backgroundPatch!!.source!!.width - (scale * style.backgroundPatch!!.right).toInt(),
                null))
    } else {
        style.backgroundColor?.let {
            if (style.borderRadius != null) {
                res.background(BackgroundSolidColorDrawable(it, Resources.getSystem().displayMetrics.density * style.borderRadius!!))
            } else {
                res.backgroundColor(it)
            }
        }
    }

    return res.build()
}

fun resolveNode(context: ComponentContext, spec: AsyncViewSpec, reactContext: ReactContext): Component {
    return when (spec) {
        is AsyncFlexSpec -> return LithoFlex.create(context)
                .spec(spec)
                .reactContext(reactContext)
                .clipToOutline(false)
                .build()
        is AsyncTextSpec -> {
            return LithoText.create(context)
                    .spec(spec)
                    .reactContext(reactContext)
                    .build()
        }
        is AsyncImageSpec -> {
            return LithoImage.create(context)
                    .spec(spec)
                    .reactContext(reactContext)
                    .build()
        }
//        is AsyncListSpec -> {
//            val res = RecyclerCollectionComponent.create(context)
//                    .disablePTR(true)
//                    .section(LithoSection.create(SectionContext(context))
//                            .dataModel(spec.children.toList())
//                            .reactContext(reactContext))
//            resolveStyle(context, res, spec.style)
//        }
        else -> error("Unsupported spec")
    }
}