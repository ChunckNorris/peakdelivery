import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ui } from '../../providers/ui/ui';
import { Subscription } from 'rxjs/Subscription';



 
@Component({
  selector: 'loading-indicator',
  templateUrl: 'loading-indicator.html'
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  
  isLoading = false;
  private subscription: Subscription;

  constructor(public ui: Ui) { }

  ngOnInit() {
      this.subscription = this.ui.loadingEvent.subscribe(loading => {
          this.isLoading = loading
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
