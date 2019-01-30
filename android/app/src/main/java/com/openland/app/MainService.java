package com.openland.app;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class MainService extends HeadlessJsTaskService {

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig("KeepAlive", Arguments.fromBundle(extras), 0, true);
        }
        return null;
    }

    @Override
    public void onHeadlessJsTaskStart(int taskId) {
        super.onHeadlessJsTaskStart(taskId);
        Log.d("KeepAlive", "Task started");
    }

    @Override
    public void onHeadlessJsTaskFinish(int taskId) {
        super.onHeadlessJsTaskFinish(taskId);
        Log.d("KeepAlive", "Task finished");
    }
}
