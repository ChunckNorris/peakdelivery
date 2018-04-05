import { NgModule } from '@angular/core';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator';
import { CollectSignatureComponent } from './collect-signature/collect-signature';
import { LabelScannerComponent } from './label-scanner/label-scanner';
@NgModule({
	declarations: [LoadingIndicatorComponent,
    CollectSignatureComponent,
    LabelScannerComponent],
	imports: [],
	exports: [LoadingIndicatorComponent,
    CollectSignatureComponent,
    LabelScannerComponent]
})
export class ComponentsModule {}
