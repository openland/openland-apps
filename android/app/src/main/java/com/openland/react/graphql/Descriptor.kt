package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.JSONObject

interface SpaceXOperations {
    fun operationByName(name: String): OperationDefinition
}

data class ResolveContext(val raw: JSONObject, val fragments: MutableMap<String, FragmentDefinition> = mutableMapOf())

fun resolveInputType(data: JSONObject, ctx: ResolveContext): InputValue {
    val type = data.getString("type")
    if (type == "string") {
        return stringValue(data.getString("str"))
    } else if (type == "int") {
        return intValue(data.getInt("int"))
    } else if (type == "float") {
        return floatValue(data.getDouble("float"))
    } else if (type == "boolean") {
        return boolValue(data.getBoolean("bool"))
    } else if (type == "null") {
        return nullValue()
    } else if (type == "reference") {
        return refValue(data.getString("name"))
    } else if (type == "list") {
        val items = mutableListOf<InputValue>()
        val d = data.getJSONArray("items")
        for (i in 0 until d.length()) {
            items.add(resolveInputType(d.getJSONObject(i), ctx))
        }
        return listValue(items)
    } else if (type == "object") {
        val fields = mutableMapOf<String, InputValue>()
        val d = data.getJSONObject("fields")
        for (key in d.keys()) {
            fields[key] = resolveInputType(d.getJSONObject(key), ctx)
        }
        return objectValue(fields)
    }

    throw Error("Invalid schema")
}

fun resolveOutputObject(data: JSONObject, ctx: ResolveContext): OutputType.Object {
    if (data.getString("type") != "object") {
        throw Error("Invalid schema")
    }
    val selectors = mutableListOf<Selector>()

    return obj(selectors)
}

fun resolveOutputType(data: JSONObject, ctx: ResolveContext): OutputType {
    val type = data.getString("type")
    if (type == "object") {
        return resolveOutputObject(data, ctx)
    }
    if (type == "notNull") {
        return notNull(resolveOutputType(data.getJSONObject("inner"), ctx))
    }
    if (type == "list") {
        return list(resolveOutputType(data.getJSONObject("inner"), ctx))
    }
    if (type == "scalar") {
        return scalar(data.getString("name"))
    }
    throw Error("Invalid schema")
}

fun resolveSelector(selector: JSONObject, ctx: ResolveContext): Selector {
    val type = selector.getString("type")
    if (type == "field") {
        val name = selector.getString("name")
        val alias = selector.getString("alias")
        val output = resolveOutputType(selector.getJSONObject("fieldType"), ctx)
        val arguments = mutableMapOf<String, InputValue>()
        val src = selector.getJSONObject("arguments")
        for (arg in src.keys()) {
            arguments[arg] = resolveInputType(src.getJSONObject(arg), ctx)
        }
        return field(name, alias, arguments, output)
    }
    if (type == "type-condition") {
        val name = selector.getString("name")
        val obj = resolveOutputObject(selector.getJSONObject("fragmentType"), ctx)
        return inline(name, obj)
    }
    if (type == "fragment") {
        val name = selector.getString("name")
        return fragment(name, getOrCreateFragment(ctx.raw.getJSONObject("fragments").getJSONObject(name), ctx))
    }
    throw Error("Invalid schema")
}

fun getOrCreateFragment(fragment: JSONObject, ctx: ResolveContext): OutputType.Object {

    //
    // NOTE: GraphQL doesnt have cycles in fragments and therefore this method couldn't be called
    //       for the same fragment within same call stack
    //

    // Check if already exist
    val name = fragment.getString("name")
    val existing = ctx.fragments[name]
    if (existing != null) {
        return existing.selector
    }

    // Create new
    val selector = resolveOutputObject(fragment.getJSONObject("selector"), ctx)
    ctx.fragments[name] = FragmentDefinition(name, selector)
    return selector
}

class SpaceXOperationDescriptor(raw: JSONObject) : SpaceXOperations {

    val fragments = mutableMapOf<String, FragmentDefinition>()
    val operations = mutableMapOf<String, OperationDefinition>()

    init {
        val ctx = ResolveContext(raw, this.fragments)

        // Resolve fragments
        val frs = raw.getJSONObject("fragments")
        for (name in frs.keys()) {
            getOrCreateFragment(frs.getJSONObject(name), ctx)
        }

        // Resolve operations
        val ops = raw.getJSONObject("operations")
        for (name in ops.keys()) {
            val operation = ops.getJSONObject(name)
            val kind = operation.getString("kind")
            val kindParsed: OperationKind
            if (kind == "query") {
                kindParsed = OperationKind.QUERY
            } else if (kind == "mutation") {
                kindParsed = OperationKind.MUTATION
            } else if (kind == "subscription") {
                kindParsed = OperationKind.SUBSCRIPTION
            } else {
                throw Error("Invalid schema")
            }
            val body = operation.getString("body")
            val selector = resolveOutputObject(operation.getJSONObject("selector"), ctx)
            this.operations[name] = OperationDefinition(kindParsed, selector, name, body)
        }
    }

    override fun operationByName(name: String): OperationDefinition {
        throw Error("Unknown operation $name")
    }
}