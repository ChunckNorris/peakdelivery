import { Component, VERSION, OnInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ViewController } from 'ionic-angular';
import { User, Ui } from '../../providers/providers';
import { Subject } from 'rxjs/Subject';
import { Camera, CameraOptions } from '@ionic-native/camera';


import * as Tesseract from 'tesseract.js'


@IonicPage()
@Component({
    selector: 'page-modal-label-scanner',
    templateUrl: 'modal-label-scanner.html', 
})
export class ModalLabelScannerPage {

    srcImage: string;
    private files: File[] = [];
    private uploadedfiles: File[] = [];
    //submitted = false;
    isFileSaved: boolean;
    private base64textString: String = '';


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public camera: Camera,
        public viewCtrl: ViewController,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController) {
    }


    ngOnInit(): void {
    }

    ngAfterContentInit() {

    }
    analyze() {
    
        var job = Tesseract.recognize(this.srcImage);
        var loadReader = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
          });

          loadReader.present();



        job.progress(message => console.log(message));
        job.catch(err => console.error(err));
        job.then(result => {
            console.log(result)
            let data = { ocrdata: result.text, scanedData: this.srcImage };

            loadReader.dismiss();
            
            this.viewCtrl.dismiss(data);

        });
        job.finally(resultOrError => console.log(resultOrError));

    }

    restart() {
        this.srcImage = '';
        //this.presentActionSheet();
    }
    presentLoading() {
      
      }

    presentActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Choose Photo',
                    handler: () => {
                        this.getPicture(0); // 0 == Library
                    }
                }, {
                    text: 'Take Photo',
                    handler: () => {
                        this.getPicture(1); // 1 == Camera
                    }
                }, {
                    text: 'Demo Photo',
                    handler: () => {
                        this.srcImage = 'assets/img/demo.png';
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    getPicture(sourceType: number) {
        // You can check the values here:
        // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
        this.camera.getPicture({
            quality: 100,
            destinationType: 0, // DATA_URL
            sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then((imageData) => {
            this.srcImage = `data:image/jpeg;base64,${imageData}`;
        }, (err) => {
            console.log('ERROR');
        });
    }
    onFileChange(event: EventTarget) {
        this.files = [];
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        var ocrFiles = target.files;
        var file = ocrFiles[0];


        var reader = new FileReader();

        if (ocrFiles && file) {
            var reader = new FileReader();
    
            reader.onloadend = (e: any) => {
                let test = e;
            }
            reader.onload =this._handleReaderLoaded.bind(this);
            reader.readAsDataURL(file);

            //this.srcImage = reader.result;

        }

        // for (let i = 0; i < target.files.length; i++) {
        //     this.files.push(target.files.item(i));
        // }
        // let imageData = this.files[0];
        //  `data:image/jpeg;base64,${imageData}`;
       // this.analyze();

      
        this.isFileSaved = false;
    }
 _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
            this.srcImage = binaryString;
    }
}
