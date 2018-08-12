package com.korshakov.testing.openland;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.entria.views.RNViewOverflowPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;

import ca.jaysoo.extradimensions.ExtraDimensionsPackage;

import com.microsoft.codepush.react.CodePush;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.auth0.react.A0Auth0Package;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile("main.jsbundle");
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNGestureHandlerPackage(),
            new LottiePackage(),
            new LinearGradientPackage(),
            new BlurViewPackage(),
            new RNViewOverflowPackage(),
            new PickerPackage(),
            new FastImageViewPackage(),
                    new RNFetchBlobPackage(),
                    new ImagePickerPackage(),
                    new ExtraDimensionsPackage(),
                    new CodePush("MNEpl1rmOgWXcaHhd-zq-Q_8nkFLB1jDiuuVQ", getApplicationContext(), BuildConfig.DEBUG),
                    new RNDeviceInfo(),
                    new ReactNativePushNotificationPackage(),
                    new VectorIconsPackage(),
                    new A0Auth0Package()
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
    }
}
