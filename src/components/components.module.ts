import { NgModule } from '@angular/core';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator';
import { CollectSignatureComponent } from './collect-signature/collect-signature';
@NgModule({
	declarations: [LoadingIndicatorComponent,
    CollectSignatureComponent],
	imports: [],
	exports: [LoadingIndicatorComponent,
    CollectSignatureComponent]
})
export class ComponentsModule {}
