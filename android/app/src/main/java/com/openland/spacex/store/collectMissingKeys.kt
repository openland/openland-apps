package com.openland.spacex.store

import com.openland.spacex.OutputType
import com.openland.spacex.Selector
import org.json.JSONObject

/**
 * Collect Missing Keys from selectors
 * @param cacheKey Root Cache Key
 * @param store Store
 * @param selectors Selectors
 * @param arguments Query arguments
 * @return set of missing keys
 */
private fun collectMissingKeys(cacheKey: String, store: RecordStore, selectors: List<Selector>, arguments: JSONObject): Set<String> {
    if (!store.isInMemory(cacheKey)) {
        return setOf(cacheKey)
    }
    val record = store.read(cacheKey)

    val res = mutableSetOf<String>()
    for (f in selectors) {
        if (f is Selector.Field) {
            val key = selectorKey(f.name, f.arguments, arguments)
            if (record.fields.containsKey(key)) {
                res += collectMissingKeys(record.fields[key]!!, f.type, store, arguments)
            }
        } else if (f is Selector.TypeCondition) {
            if (record.fields["__typename"] == RecordValue.String(f.type)) {
                res += collectMissingKeys(cacheKey, store, f.fragment.selectors, arguments)
            }
        } else if (f is Selector.Fragment) {
            res += collectMissingKeys(cacheKey, store, f.fragment.selectors, arguments)
        } else {
            error("Unsupported selector")
        }
    }
    return res
}

/**
 * Collect Missing Keys from a value
 * @param value Record Value
 * @param type Expected Value Type
 * @param store Store
 * @param arguments Query arguments
 * @return set of missing keys
 */
private fun collectMissingKeys(value: RecordValue, type: OutputType, store: RecordStore, arguments: JSONObject): Set<String> {
    if (type is OutputType.Scalar) {
        return emptySet()
    } else if (type is OutputType.NotNull) {
        return if (value == RecordValue.Null) {
            emptySet()
        } else {
            collectMissingKeys(value, type.inner, store, arguments)
        }
    } else if (type is OutputType.List) {
        return if (value == RecordValue.Null) {
            emptySet()
        } else {
            if (value is RecordValue.List) {
                val res = mutableSetOf<String>()
                val mapped = value.items.map { collectMissingKeys(it, type.inner, store, arguments) }
                for (m in mapped) {
                    res += m
                }
                res
            } else {
                error("Invalid record value")
            }
        }
    } else if (type is OutputType.Object) {
        return if (value == RecordValue.Null) {
            emptySet()
        } else {
            if (value is RecordValue.Reference) {
                collectMissingKeys(value.key, store, type.selectors, arguments)
            } else {
                error("Invalid record value")
            }
        }
    }
    return emptySet()
}

/**
 * Collect object keys that are needed for query and not present in RecordStore
 * @param rootCacheKey Root Cache Key (usually ROOT_QUERY)
 * @param store Store
 * @param type Expected type
 * @param arguments Query Arguments
 * @return set of missing keys
 */
fun collectMissingKeysRoot(rootCacheKey: String, store: RecordStore, type: OutputType.Object, arguments: JSONObject): Set<String> {
    val res = mutableSetOf<String>()
    for (f in type.selectors) {
        if (f !is Selector.Field) {
            error("Root query cant't contain fragments")
        }
        val key = selectorKey(f.name, f.arguments, arguments)
        val refId = "$rootCacheKey.\$ref.$key"
        if (!store.isInMemory(refId)) {
            res += refId
        } else {
            val value = store.read(refId)
            val ex = value.fields["data"]
            if (ex != null) {
                res += collectMissingKeys(ex, f.type, store, arguments)
            }
        }
    }
    return res
}