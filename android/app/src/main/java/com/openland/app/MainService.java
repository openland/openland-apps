package com.openland.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class MainService extends HeadlessJsTaskService {

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("KeepAlive", "onStart");
        return START_REDELIVER_INTENT;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Log.d("KeepAlive", "onBind");
        HeadlessJsTaskConfig taskConfig = getTaskConfig(intent);
        if (taskConfig != null) {
            startTask(taskConfig);
        }
        return super.onBind(intent);
    }

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig("KeepAlive", Arguments.fromBundle(extras), 0, true);
        }
        return null;
    }

}
