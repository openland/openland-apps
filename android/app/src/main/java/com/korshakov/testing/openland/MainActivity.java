package com.korshakov.testing.openland;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;
import com.microsoft.appcenter.distribute.Distribute;

public class MainActivity extends ReactActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);

        // Disable app center for local development
        AppCenter.setEnabled(!BuildConfig.DEBUG);

        // Starting App Center
        AppCenter.start(getApplication(),
                "ca033019-79a5-4518-aefe-5d4e79d0e3f1",
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
}
