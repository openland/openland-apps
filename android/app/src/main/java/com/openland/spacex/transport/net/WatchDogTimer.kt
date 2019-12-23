package com.openland.spacex.transport.net

import com.openland.spacex.utils.DispatchQueue

class WatchDogTimer(private val timeout: Int, private val onRestart: () -> Unit, private val queue: DispatchQueue) {

    private var isDead = true
    private var timer: (() -> Unit)? = null

    fun kick() {
        if (!this.queue.isCurrentQueue) {
            throw Error("Invalid Queue")
        }
        if (this.isDead) {
            return
        }
        this.timer?.invoke()
        this.timer = null

        this.timer = this.queue.asyncDelayed(this.timeout) {
            this.timer = null
            if (!this.isDead) {
                this.isDead = true
                this.onRestart()
            }
        }
    }

    fun reset() {
        if (!this.queue.isCurrentQueue) {
            throw Error("Invalid Queue")
        }
        this.isDead = false
        this.kick()
    }

    fun kill() {
        if (!this.queue.isCurrentQueue) {
            throw Error("Invalid Queue")
        }

        this.isDead = true
        this.timer?.invoke()
        this.timer = null
    }
}