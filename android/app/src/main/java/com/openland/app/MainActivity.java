package com.openland.app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

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

            @Override
            protected void onPause() {
                super.onPause();
                Log.d("MainActivity","onPause");
            }

            @Override
            protected void onResume() {
                super.onResume();
                Log.d("MainActivity","onResume");
            }

            @Override
            protected void onDestroy() {
                super.onDestroy();
                Log.d("MainActivity","onDestroy");
            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().getDecorView().setSystemUiVisibility( View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
    }

    @Override
    protected void onPause() {
        super.onPause();

        // Start keep alive service
        Intent service = new Intent(getApplicationContext(), MainService.class);
        Bundle bundle = new Bundle();
        service.putExtras(bundle);
        startService(service);
    }
}
