import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonServiceService } from '../../../services/common-service.service';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule,
    MatSidenavModule,
    MatListModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  constructor(private cs:CommonServiceService){}

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.cs.eventEmitter.emit(this.isCollapsed);
  }

  showSidebar(){
    this.isCollapsed = !this.isCollapsed;
  }
  closeSidebar(){
    this.isCollapsed = false;
  }

  shrinkMain() {
    this.cs.eventEmitter.emit('true');
  }

  expandMain() {
    this.cs.eventEmitter.emit('false');
  }

}
