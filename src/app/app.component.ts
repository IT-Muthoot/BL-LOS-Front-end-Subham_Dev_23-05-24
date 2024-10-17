import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, RouterModule } from '@angular/router';
import { SideNavComponent } from './components/main-layout/side-nav/side-nav.component';
import { HeaderComponent } from './components/main-layout/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Subscription } from 'rxjs';
import { CommonServiceService } from './services/common-service.service';
import { CommonModule } from '@angular/common';
import { ScrollUpDirective } from './core/directives/scroll-up.directive';
import { LoaderComponent } from './core/loader/loader/loader.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent, HeaderComponent, DashboardComponent, CommonModule, RouterModule, ScrollUpDirective, LoaderComponent,LoanCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BL-LOS-Front-End';
  private subscription: Subscription | undefined;
  eventData:any;
  showHead: boolean = false;
  showSidebar: boolean = false;
  isShrink: boolean = false;

  constructor(private cs:CommonServiceService, public router: Router,){

    this.subscription = this.cs.eventEmitter.subscribe((data) => {
      this.eventData = data;
      if (this.eventData == 'true') {
        this.isShrink = true;
      } else {
        this.isShrink = false;
      }
    });

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/' || event['url'] == '/set-password'|| event['url'] == '/forgot-password' || event['url'] == '/security-question-set') {
          this.showHead = false;
          this.showSidebar = false;
        } else {
          this.showHead = true;
          this.showSidebar = true;
        }
      }
    });
  }
}
