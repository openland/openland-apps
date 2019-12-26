package com.openland.app;

import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

public class MainService extends Service {

    private Handler handler = new Handler(msg -> {
        if (msg.what == 0) {
            Log.d("GraphQL-Lifecycle", "MainService: Stop Self");
            stopSelf();
        }
        return true;
    });

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("GraphQL-Lifecycle", "MainService: Create");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        handler.removeMessages(0);
        handler.sendEmptyMessageDelayed(0, 15000);
        Log.d("GraphQL-Lifecycle", "MainService: Command");
        return START_NOT_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
