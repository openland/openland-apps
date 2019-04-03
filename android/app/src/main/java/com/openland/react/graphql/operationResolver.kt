package com.openland.react.graphql

import com.apollographql.apollo.api.*
import com.facebook.react.bridge.ReadableMap
import kotlin.reflect.KParameter
import kotlin.reflect.full.functions
import kotlin.reflect.full.isSubclassOf
import kotlin.reflect.full.staticFunctions
import kotlin.reflect.jvm.jvmErasure

fun parseInputArguments(name: String, arguments: ReadableMap?): Any {
    val clazz = Class.forName(name).kotlin
    val clazzBuilder = Class.forName("$name\$Builder").kotlin
    val builder = clazz.staticFunctions.find { it.name == "builder" }!!.call()
    if (arguments != null) {
        val i = arguments.keySetIterator()
        while (i.hasNextKey()) {
            val k = i.nextKey()
            val bf = clazzBuilder.functions.find { it.name == k } ?: continue
            val argType = bf.parameters.find { it.kind == KParameter.Kind.VALUE }!!.type
            val arg = argType.jvmErasure.qualifiedName
            if (arg == "kotlin.String") {
                bf.call(builder, arguments.getString(k))
            } else if (arg == "kotlin.Int") {
                bf.call(builder, arguments.getInt(k))
            } else if (arg == "kotlin.Boolean") {
                bf.call(builder, arguments.getBoolean(k))
            } else if (arg == "kotlin.collections.List") {
                val list = arrayListOf<String>()
                val arr = arguments.getArray(k)
                if (arr != null) {
                    for (i in 0 until arr.size()) {
                        list.add(arr.getString(i))
                    }
                }
                bf.call(builder, list)
            } else {
                if (Class.forName(arg).isEnum) {
                    val arg2 = arguments.getString(k)
                    var found = false
                    for (e in Class.forName(arg).enumConstants) {
                        if (arg2 == (e as Enum<*>).name) {
                            bf.call(builder, e)
                            found = true
                            break
                        }
                    }
                    if (!found) {
                        throw Error("Unable to find enum value: $arg2")
                    }
                } else {
                    if (argType.jvmErasure.isSubclassOf(InputType::class)) {
                        val input = parseInputArguments(argType.jvmErasure.qualifiedName!!, arguments.getMap(k))
                        bf.call(builder, input)
                    } else {
                        throw Error("!!")
                    }
                }
            }
        }
    }
    return clazzBuilder.functions.find { it.name == "build" }!!.call(builder)!!
}

fun createOperation(type: String, query: String, arguments: ReadableMap?): Operation<Operation.Data, Operation.Data, Operation.Variables> {
    return parseInputArguments("com.openland.api.$query$type", arguments) as Operation<Operation.Data, Operation.Data, Operation.Variables>
}

//fun createQuery(query: String, arguments: ReadableMap): Query<Operation.Data, Operation.Data, Operation.Variables> {
//    return createOperation("Query", query, arguments) as Query<Operation.Data, Operation.Data, Operation.Variables>
//}

fun createMutation(query: String, arguments: ReadableMap): Mutation<Operation.Data, Operation.Data, Operation.Variables> {
    return createOperation("Mutation", query, arguments) as Mutation<Operation.Data, Operation.Data, Operation.Variables>
}

fun createSubscription(query: String, arguments: ReadableMap): Subscription<Operation.Data, Operation.Data, Operation.Variables> {
    return createOperation("Subscription", query, arguments) as Subscription<Operation.Data, Operation.Data, Operation.Variables>
}