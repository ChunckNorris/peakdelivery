// import { Component, VERSION, OnInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
// import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ViewController } from 'ionic-angular';
// import {  ZXingScannerComponent } from '@zxing/ngx-scanner';
// import * as Quagga from 'Quagga';
// import { User, Ui, BarcodeDecoderProvider, BarcodeValidatorProvider } from '../../providers/providers';
// import { Subject } from 'rxjs/Subject';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// // import {encodeCode39, renderBarcodeToSVG} from "barcodejs"
// //import { NgxZxingComponent } from '@zxing/ngx-scanner';

// //https://github.com/Schibum/barcode.js

// import * as Tesseract from 'tesseract.js'


// @IonicPage()
// @Component({
//     selector: 'page-modal-label-scanner',
//     templateUrl: 'modal-label-scanner.html',
// })
// export class ModalLabelScannerPage {
//     @ViewChild('scanner') scanner: ZXingScannerComponent;

//     sound = new Audio('assets/barcode.wav');
//     hasCameras = false;
//     hasPermission: boolean;
//     qrResultString: string;

//     srcImage: string;
//     OCRAD: any;

//     // availableDevices: MediaDeviceInfo[];
//     // selectedDevice: MediaDeviceInfo;

//     // lastResult: any;
//     // message: any;
//     // error: any;
  
//     // code$ = new Subject<any>();
  
//     // @ViewChild('interactive') interactive;

//     constructor(public navCtrl: NavController,
//         public navParams: NavParams, 
//         public camera: Camera,
//         public viewCtrl: ViewController,
//         public actionSheetCtrl: ActionSheetController,
//         private decoderService: BarcodeDecoderProvider, 
//         private barcodeValidator: BarcodeValidatorProvider,
//         public loadingCtrl: LoadingController) {
//     }


//     ngOnInit(): void {
         

        
//         // this.decoderService.onLiveStreamInit();
//         // this.decoderService.onDecodeProcessed();
    
//         // this.decoderService
//         //   .onDecodeDetected()
//         //   .then(code => {
//         //     this.lastResult = code;
//         //     alert('Code Scanned: ' + code);
//         //     this.decoderService.onPlaySound();
//         //     this.code$.next(code);
//         //   })
//         //   .catch((err) => this.error = '');
    
//         // this.barcodeValidator
//         //   .doSearchbyCode(this.code$)
//         //   .subscribe(
//         //     res => this.message = res,
//         //     err => {
//         //       this.message = 'Error';
//         //     },
//         //   );

  

//     }
//     ngAfterContentInit() {
//         //this.interactive.nativeElement.children[0].style.position = 'absolute';
//       }
    
//       ngOnDestroy() {
//         this.decoderService.onDecodeStop();
//       }
//               // handleQrCodeResult(resultString: string) {
//         //     console.log('Result: ', resultString);
//         //     this.qrResultString = resultString;
//         // }

//         onDeviceSelectChange(selectedValue: string) {
//             console.log('Selection changed: ', selectedValue);
//             //this.selectedDevice = this.scanner.getDeviceById(selectedValue);
//         }

//         presentActionSheet() {
//           const actionSheet = this.actionSheetCtrl.create({
//             buttons: [
//               {
//                 text: 'Choose Photo',
//                 handler: () => {
//                   this.getPicture(0); // 0 == Library
//                 }
//               },{
//                 text: 'Take Photo',
//                 handler: () => {
//                   this.getPicture(1); // 1 == Camera
//                 }
//               },{
//                 text: 'Demo Photo',
//                 handler: () => {
//                   this.srcImage = 'assets/img/demo.png';
//                 }
//               },{
//                 text: 'Cancel',
//                 role: 'cancel'
//               }
//             ]
//           });
//           actionSheet.present();
//         }
//         getPicture(sourceType: number) {
//           // You can check the values here:
//           // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
//           this.camera.getPicture({
//             quality: 100,
//             destinationType: 0, // DATA_URL
//             sourceType,
//             allowEdit: true,
//             saveToPhotoAlbum: false,
//             correctOrientation: true
//           }).then((imageData) => {
//             this.srcImage = `data:image/jpeg;base64,${imageData}`;
//           }, (err) => {
//             console.log('ERROR');
//           });
//         }
      
//         analyze() {
//           // let loader = this.loadingCtrl.create({
//           //  content: 'Please wait...'
//           // });
//           // loader.present();
//           // (<any>window).OCRAD(document.getElementById('image'), text => {
//           //   loader.dismissAll();
//           //   alert(text);
//           //   console.log(text);
//           // }, err => {
//           //   loader.dismissAll();
//           //   alert(err);
//           // });
//           var job = Tesseract.recognize(this.srcImage);
//           job.progress(message => console.log(message));
//           job.catch(err => console.error(err));
//           job.then(result => {
//             console.log(result)
//             let data = { ocrdata: result.text };
            
              
//             this.viewCtrl.dismiss(data);

//           });
//           job.finally(resultOrError => console.log(resultOrError));

//         }
      
//         restart() {
//           this.srcImage = '';
//           this.presentActionSheet();
//         }


// }




//         // handleQrCodeResult(resultString: string) {
//         //     console.log('Result: ', resultString);
//         //     this.qrResultString = resultString;
//         // }

//         // onDeviceSelectChange(selectedValue: string) {
//         //     console.log('Selection changed: ', selectedValue);
//         //     this.selectedDevice = this.scanner.getDeviceById(selectedValue);
//         // }