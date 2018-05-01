import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, App, IonicApp, MenuController, Events } from 'ionic-angular';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { Settings } from '../providers/providers';
import { AdminDashboardPage, CustomerDashboardPage, DriverDashboardPage, ProfilePage, ModalSignPage, MainDashboardPage } from '../pages/pages'
import { LoadingIndicatorComponent } from '../components/loading-indicator/loading-indicator';


@Component({
  template: `<loading-indicator></loading-indicator>
  <ion-menu [content]="content" side="right"  persistent="true">
    <ion-header>
      <ion-toolbar >
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  @ViewChild(Nav) nav: Nav;


  // { title: 'Admin Dashboard', component: AdminDashboardPage },
  // { title: 'Driver Dashboard', component: DriverDashboardPage },
  // { title: 'Customer Dashboard', component: CustomerDashboardPage },


  pages: any[] = [
    { title: 'Dashboard', component: MainDashboardPage },
    { title: 'My Profile', component: ProfilePage },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Logout', component: LoginPage },
  ]

  constructor(private translate: TranslateService, 
    platform: Platform, 
    settings: Settings, 
    public app: App, 
    private config: Config, 
    private statusBar: StatusBar, 
    private _ionicApp: IonicApp,
    private menuCtrl: MenuController,
    private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.setupBackButtonBehavior();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.app.setTitle("Peak Delivery");
    });
    this.initTranslate();
    this.app.setTitle("Peak Delivery");
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.app.setTitle("Peak Delivery");
  }
  private setupBackButtonBehavior() {
    
        // If on web version (browser)
        if (window.location.protocol !== "file:") {
    
          // Register browser back button action(s)
          window.onpopstate = (evt) => {
    
            // Close menu if open
            if (this.menuCtrl.isOpen()) {
              this.menuCtrl.close();
              return;
            }
    
            // Close any active modals or overlays
            let activePortal = this._ionicApp._loadingPortal.getActive() ||
              this._ionicApp._modalPortal.getActive() ||
              this._ionicApp._toastPortal.getActive() ||
              this._ionicApp._overlayPortal.getActive();
    
            if (activePortal) {
              activePortal.dismiss();
              return;
            }
    
            // Navigate back
            if (this.app.getRootNav().canGoBack()) this.app.getRootNav().pop();
    
          };
    
          // Fake browser history on each view enter
          this.app.viewDidEnter.subscribe((app) => {
            history.pushState(null, null, "");
          });
    
        }
    
      }

}
