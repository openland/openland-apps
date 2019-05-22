package com.openland.spacex.utils

fun fatalError(message: String? = null): Nothing {
    error(message ?: "Fatal Error")
}