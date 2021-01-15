package com.openland.app;

import android.app.Application;
import android.util.Log;

import androidx.appcompat.app.AppCompatDelegate;

import com.codemotionapps.reactnativedarkmode.DarkModePackage;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
import com.openland.react.animations.FastAnimationsPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactcommunity.rnlocalize.RNLocalizePackage;

import com.brentvatne.react.ReactVideoPackage;

import org.wonday.pdf.RCTPdfView;

import com.ocetnik.timer.BackgroundTimerPackage;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import com.openland.lmdb.LMDB;
import com.stripe.android.PaymentConfiguration;
import com.zxcpoiu.incallmanager.InCallManagerPackage;

import ca.jaysoo.extradimensions.ExtraDimensionsPackage;

import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.oney.WebRTCModule.WebRTCModulePackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;

import org.pgsqlite.SQLitePluginPackage;

import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import com.openland.react.RNSPackage;

import dk.madslee.imageCapInsets.RCTImageCapInsetPackage;

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
import com.airbnb.android.react.lottie.LottiePackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new FastAnimationsPackage(),
                    new RNLocationPackage(),
                    new RNVersionNumberPackage(),
                    new CameraRollPackage(),
                    new RNGooglegPackage(),
                    new ReactVideoPackage(),
                    new RCTPdfView(),
                    new BackgroundTimerPackage(),
                    new RNReactNativeHapticFeedbackPackage(),
                    new InCallManagerPackage(),
                    new ExtraDimensionsPackage(),
                    new ReactNativeDocumentPicker(),
                    new WebRTCModulePackage(),
                    new AndroidOpenSettingsPackage(),
                    new ReactNativeRestartPackage(),
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
                    new SQLitePluginPackage(),
                    new DarkModePackage(),
                    new LottiePackage(),
                    new SafeAreaContextPackage(),
                    new ReactNativeContacts(),
                    new RNLocalizePackage()
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
