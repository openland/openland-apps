package com.openland.react.hacks;

import android.app.Activity;
import android.graphics.drawable.ColorDrawable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BackgroundHack extends ReactContextBaseJavaModule {

    public BackgroundHack(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OPLBackgroundHack";
    }

    @ReactMethod
    public void removeBackground() {
        final Activity activity = getCurrentActivity();

        if (activity == null) {
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.getWindow().setBackgroundDrawable(new ColorDrawable(0));
            }
        });
    }

    @ReactMethod
    public void restoreBackground() {
        final Activity activity = getCurrentActivity();

        if (activity == null) {
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.getWindow().setBackgroundDrawable(new ColorDrawable(0xffffffff));
            }
        });
    }

}
