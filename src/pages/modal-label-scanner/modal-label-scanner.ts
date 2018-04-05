import { Component, VERSION, OnInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {  ZXingScannerComponent } from '@zxing/ngx-scanner';
import * as Quagga from 'Quagga';
import { User, Ui, BarcodeDecoderProvider, BarcodeValidatorProvider } from '../../providers/providers';
import { Subject } from 'rxjs/Subject';

// import {encodeCode39, renderBarcodeToSVG} from "barcodejs"
//import { NgxZxingComponent } from '@zxing/ngx-scanner';

//https://github.com/Schibum/barcode.js

@IonicPage()
@Component({
    selector: 'page-modal-label-scanner',
    templateUrl: 'modal-label-scanner.html',
})
export class ModalLabelScannerPage {
    //@ViewChild('scanner') scanner: ZXingScannerComponent;

    sound = new Audio('assets/barcode.wav');
    hasCameras = false;
    hasPermission: boolean;
    qrResultString: string;

    // availableDevices: MediaDeviceInfo[];
    // selectedDevice: MediaDeviceInfo;

    lastResult: any;
    message: any;
    error: any;
  
    code$ = new Subject<any>();
  
    @ViewChild('interactive') interactive;

    constructor(public navCtrl: NavController,
        public navParams: NavParams, 
        private decoderService: BarcodeDecoderProvider, 
        private barcodeValidator: BarcodeValidatorProvider) {
    }


    ngOnInit(): void {

        this.decoderService.onLiveStreamInit();
        this.decoderService.onDecodeProcessed();
    
        this.decoderService
          .onDecodeDetected()
          .then(code => {
            this.lastResult = code;
            alert('Code Scanned: ' + code);
            this.decoderService.onPlaySound();
            this.code$.next(code);
          })
          .catch((err) => this.error = `Something Wrong: ${err}`);
    
        this.barcodeValidator
          .doSearchbyCode(this.code$)
          .subscribe(
            res => this.message = res,
            err => {
              this.message = `An Error! ${err.json().error}`;
            },
          );

  

    }
    ngAfterContentInit() {
        this.interactive.nativeElement.children[0].style.position = 'absolute';
      }
    
      ngOnDestroy() {
        this.decoderService.onDecodeStop();
      }

}


      //     this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
        //         this.hasCameras = true;

        //         console.log('Devices: ', devices);
        //         this.availableDevices = devices;

        //         // selects the devices's back camera by default
        //         for (const device of devices) {
        //             if (/back|rear|environment/gi.test(device.label)) {
        //                 this.scanner.changeDevice(device);
        //                 this.selectedDevice = device;
        //                 break;
        //             }
        //         }
        //     });

        //     this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
        //         console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
        //     });

        //     this.scanner.permissionResponse.subscribe((answer: boolean) => {
        //       this.hasPermission = answer;
        //     });

        // }

        // handleQrCodeResult(resultString: string) {
        //     console.log('Result: ', resultString);
        //     this.qrResultString = resultString;
        // }

        // onDeviceSelectChange(selectedValue: string) {
        //     console.log('Selection changed: ', selectedValue);
        //     this.selectedDevice = this.scanner.getDeviceById(selectedValue);
        // }