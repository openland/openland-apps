package com.openland.spacex.utils

fun backoffDelay(currentFailureCount: Int, minDelay: Int, maxDelay: Int, maxFailureCount: Int): Int {
    val maxDelayRet = minDelay.toFloat() + ((maxDelay.toFloat() - minDelay.toFloat()) / maxFailureCount.toFloat()) * currentFailureCount
    return (Math.random() * maxDelayRet).toInt()
}