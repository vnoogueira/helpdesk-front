import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.router.navigate(['chamados'])
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso !', 'Logout', { timeOut: 7000 })
  }

  changeIcons() {
    if (document.getElementById('mat-icon').innerText = "menu") {
      document.getElementById('mat-icon').innerText = "close";
    }
  }

  changeIcon(){
    if (document.getElementById('mat-icon').innerText = "close") {
      document.getElementById('mat-icon').innerText = "menu";
    } 
  }

}
