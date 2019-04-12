package com.openland.app;

import android.app.Application;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import com.zxcpoiu.incallmanager.InCallManagerPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.oney.WebRTCModule.WebRTCModulePackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.auth0.react.A0Auth0Package;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.distribute.Distribute;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import org.pgsqlite.SQLitePluginPackage;

import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import com.microsoft.appcenter.reactnative.shared.AppCenterReactNativeShared;
import com.openland.react.RNSPackage;

import dk.madslee.imageCapInsets.RCTImageCapInsetPackage;

import com.openland.react.threads.RNThreadPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
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
            new RNSoundPackage(),
            new RNReactNativeHapticFeedbackPackage(),
            new InCallManagerPackage(),
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
                    new LinearGradientPackage(),
                    new BlurViewPackage(),
                    new PickerPackage(),
                    new FastImageViewPackage(),
                    new RNFetchBlobPackage(),
                    new ImagePickerPackage(),
                    new RNDeviceInfo(),
                    new ReactNativePushNotificationPackage(),
                    new RNSPackage(),
                    new SQLitePluginPackage()
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
