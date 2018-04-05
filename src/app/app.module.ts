import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SignaturePadModule } from 'angular2-signaturepad';

import { HttpModule } from '@angular/http';

import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';



import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { CustomerDashboardPage, 
  DriverDashboardPage, 
  AdminDashboardPage, 
  DriverAddDeliveryPage, 
  DriverEditDeliveryPage, 
  DriverListDeliveryPage, 
  DriverSearchDeliveryPage,
  ProfilePage,
  ModalSignPage,
AccountAddPage,
AccountEditPage,
AccountMainPage,
AccountSearchPage,
UserAddPage,
AdminManageUserPage,
UserSearchPage,
UserEditPage,
ModalLabelScannerPage } from '../pages/pages'
  import { LoginPage } from '../pages/login/login';
import { Ui} from '../providers/ui/ui';
import { LoadingIndicatorComponent } from '../components/loading-indicator/loading-indicator';
import { LabelScannerComponent } from '../components/label-scanner/label-scanner';
import { CollectSignatureComponent } from '../components/collect-signature/collect-signature';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Environment } from '../providers/environment/environment';


import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeValidatorProvider } from '../providers/barcode-validator/barcode-validator';
import { BarcodeDecoderProvider } from '../providers/barcode-decoder/barcode-decoder';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Tim Rankel',
    option3: '3',
    option4: 'Test'
  });
}

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    CustomerDashboardPage,
    AdminDashboardPage,
    DriverDashboardPage,
    DriverAddDeliveryPage, 
    DriverEditDeliveryPage, 
    DriverListDeliveryPage, 
    DriverSearchDeliveryPage,
    ProfilePage,
    LoginPage,
    LoadingIndicatorComponent,
    CollectSignatureComponent,
    ModalSignPage,
    AccountAddPage,
    AccountEditPage,
    AccountMainPage,
    AccountSearchPage,
    UserAddPage,
    AdminManageUserPage,
    UserSearchPage,
    UserEditPage,
    LabelScannerComponent,
    ModalLabelScannerPage
  ],
  imports: [ 
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    SignaturePadModule,
    HttpModule,
    ZXingScannerModule,
    NgxQRCodeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    CustomerDashboardPage,
    AdminDashboardPage,
    DriverDashboardPage,
    DriverAddDeliveryPage, 
    DriverEditDeliveryPage, 
    DriverListDeliveryPage, 
    DriverSearchDeliveryPage,
    ProfilePage,
    LoginPage,
    ModalSignPage,
    AccountAddPage,
    AccountEditPage,
    AccountMainPage,
    AccountSearchPage,
    UserAddPage,
    AdminManageUserPage,
    UserSearchPage,
    UserEditPage,
    LabelScannerComponent,
    ModalLabelScannerPage
  ],
  providers: [
    Api,
    Items,
    User,
    SplashScreen,
    StatusBar,
    BarcodeScanner,
    InAppBrowser,
    Environment,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Ui,
    BarcodeValidatorProvider,
    BarcodeDecoderProvider
  ]
})
export class AppModule { }
