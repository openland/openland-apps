package com.openland.app;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.korshakov.testing.app.BuildConfig;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;
import com.microsoft.appcenter.distribute.Distribute;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Disable app center for local development
        AppCenter.setEnabled(!BuildConfig.DEBUG);

        // Starting App Center
        AppCenter.start(getApplication(),
                "310cf1a8-0d5f-4a92-8308-60c7d8c24f94",
                Distribute.class,
                Analytics.class,
                Crashes.class);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "openland";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
