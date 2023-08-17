import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
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
    private toast: ToastrService){
  }

  ngOnInit(): void {
    this.router.navigate(['clientes'])
  }

  logout(){
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso !', 'Logout', {timeOut:7000})
  }

}
