package com.openland.app;

import android.app.Application;
import android.util.Log;

import androidx.appcompat.app.AppCompatDelegate;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.openland.lmdb.LMDB;
import com.stripe.android.PaymentConfiguration;
import cl.json.ShareApplication;

import com.openland.react.RNSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> res = new PackageList(this).getPackages();
            res.add(new RNSPackage());
            return res;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("Native", "BOOTSTRAP: Starting app");

        // Load Native Libraries
        SoLoader.init(this, /* native exopackage */ false);
        Log.d("Native", "BOOTSTRAP: soloader done");
        Fresco.initialize(this);
        Log.d("Native", "BOOTSTRAP: fresco done");
        LMDB.INSTANCE.loadLibrary(this);
        Log.d("Native", "BOOTSTRAP: lmdb done");

        // Hack Status Bar color
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);

        // Stripe
        PaymentConfiguration.init(this, "pk_live_eLENsh8Ten2AoOcJhfxUkTfD");

        Log.d("Native", "BOOTSTRAP: app start done");
    }


    @Override
    public String getFileProviderAuthority() {
        return BuildConfig.APPLICATION_ID + ".provider";
    }
}
