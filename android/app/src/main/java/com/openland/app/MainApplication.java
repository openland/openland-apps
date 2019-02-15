package com.openland.app;

import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.bridge.ProxyJavaScriptExecutor;
import com.oney.WebRTCModule.WebRTCModulePackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.auth0.react.A0Auth0Package;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;
import com.microsoft.appcenter.distribute.Distribute;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;

import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import com.microsoft.appcenter.reactnative.shared.AppCenterReactNativeShared;
import com.openland.app.BuildConfig;
import com.openland.react.RNSPackage;

import dk.madslee.imageCapInsets.RCTImageCapInsetPackage;

import com.openland.react.threads.RNThreadPackage;
import com.openland.react.v8.V8Executor;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

//        @Nullable
//        @Override
//        protected JavaScriptExecutorFactory getJavaScriptExecutorFactory() {
//            return new ProxyJavaScriptExecutor.Factory(new V8Executor.Factory(MainApplication.this));
//        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new ExtraDimensionsPackage(),
            new ReactNativeDocumentPicker(),
                    new WebRTCModulePackage(),
                    new AndroidOpenSettingsPackage(),
                    new A0Auth0Package(),
                    new RNThreadPackage(mReactNativeHost),
                    new ReactNativeRestartPackage(),
                    new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
                    new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
                    new RNSharePackage(),
                    new RCTImageCapInsetPackage(),
                    new RNGestureHandlerPackage(),
                    new LottiePackage(),
                    new LinearGradientPackage(),
                    new BlurViewPackage(),
                    new PickerPackage(),
                    new FastImageViewPackage(),
                    new RNFetchBlobPackage(),
                    new ImagePickerPackage(),
                    new RNDeviceInfo(),
                    new ReactNativePushNotificationPackage(),
                    new RNSPackage()
            );
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
        SoLoader.init(this, /* native exopackage */ false);
        Fresco.initialize(this);

        // App Center
        AppCenterReactNativeShared.configureAppCenter(this);
        AppCenter.start(Distribute.class);

//        // Start keep alive service
//        Intent service = new Intent(getApplicationContext(), MainService.class);
//        Bundle bundle = new Bundle();
//        service.putExtras(bundle);
//        startService(service);
    }

    @Override
    public String getFileProviderAuthority() {
        return BuildConfig.APPLICATION_ID + ".provider";
    }
}
