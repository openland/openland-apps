package com.openland.app;

import android.app.Application;
import android.util.Log;

import androidx.appcompat.app.AppCompatDelegate;

import com.openland.app.generated.BasePackageList;

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

import com.bugsnag.android.Bugsnag;
import com.tencent.mmkv.MMKV;

import java.util.Arrays;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

    private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> res = new PackageList(this).getPackages();
            res.add(new RNSPackage());
            // Add unimodules
            List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
                    new ModuleRegistryAdapter(mModuleRegistryProvider)
            );
            res.addAll(unimodules);
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
        MMKV.initialize(this);
        Log.d("Native", "BOOTSTRAP: lmdb done");

        // Hack Status Bar color
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);

        // Stripe
        PaymentConfiguration.init(this, "pk_live_eLENsh8Ten2AoOcJhfxUkTfD");

        Bugsnag.start(this);

        Log.d("Native", "BOOTSTRAP: app start done");
    }


    @Override
    public String getFileProviderAuthority() {
        return BuildConfig.APPLICATION_ID + ".provider";
    }
}
