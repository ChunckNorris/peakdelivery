import { Injectable } from '@angular/core';

import * as Quagga from 'Quagga';



@Injectable()
export class BarcodeDecoderProvider {
  sound = new Audio('assets/barcode.wav');
  
    constructor() {}
  
    onDecodeSingle(src) {
      DECODER_CONFIG.src = src;
      // Promisify DecodeSingle method from Quagga
      return new Promise((resolve, reject) => {
        Quagga.decodeSingle(DECODER_CONFIG, result => {
          if (!result || typeof result.codeResult === 'undefined') {
            reject('File Cannot be Decode, Please Try a Valid Barcode;');
          }
          resolve(result.codeResult.code);
        });
      });
    }
  
    private setLiveStreamConfig() {
      DECODER_LIVE_CONFIG.inputStream = {
        type: 'LiveStream',
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          facingMode: 'environment',
          aspectRatio: {
            min: 1,
            max: 2,
          },
        },
      };
      return DECODER_LIVE_CONFIG;
    }
  
    onLiveStreamInit() {
      const state = this.setLiveStreamConfig();
      Quagga.init(state, (err) => {
        if (err) {
          return console.error(err);
        }
        Quagga.start();
      });
    }
  
    onProcessed(result: any) {
      let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
  
      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, {
              x: 0,
              y: 1,
            }, drawingCtx, {
              color: 'green',
              lineWidth: 2,
            });
          });
        }
  
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, {
            x: 0,
            y: 1,
          }, drawingCtx, {
            color: '#00F',
            lineWidth: 2,
          });
        }
  
        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, {
            x: 'x',
            y: 'y',
          }, drawingCtx, {
            color: 'red',
            lineWidth: 3,
          });
        }
  
      }
    }
  
    onDecodeProcessed() {
      Quagga.onProcessed(this.onProcessed);
    }
  
    onDecodeDetected() {
      // Promisify OnDetected method from Quagga
      return new Promise((resolve, reject) => {
        Quagga.onDetected(result => {
  
          if (!result || typeof result.codeResult === 'undefined') {
            reject('Cannot be Detected, Please Try again!');
          }
          resolve(result.codeResult.code);
        });
      });
    }
  
    onDecodeStop() {
      Quagga.stop();
      console.info('Camera Stopped Working!');
    }
  
    onPlaySound() {
      this.sound.play();
    }
  
  }

  
  
export let DECODER_CONFIG;
DECODER_CONFIG = {
  inputStream: {
    size: 800,
  },
  locator: {
    patchSize: 'medium',
    halfSample: false,
  },
  numOfWorkers: 1,
  decoder: {
    // readers: ['ean_reader', 'code_128_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader',
    //   'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader'],
    readers: ['ean_reader'], // To have a better performance, let's just pass only one type of barcode
  },
  locate: true,
  src: null,
};

export let DECODER_LIVE_CONFIG;
DECODER_LIVE_CONFIG = {
  locator: {
    patchSize: 'medium',
    halfSample: false,
  },
  numOfWorkers: 1,
  decoder: {
    // readers: ['ean_reader', 'code_128_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader',
    //   'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader'],
    readers: ['ean_reader'], // To have a better performance, let's just pass only one type of barcode
  },
  locate: true,
};
