import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
      .container{
        margin:20px;
      }
    `]
})
export class HomeComponent implements OnInit {

  get auth():Auth {
    return this.authService.auth;
  }

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login'])
  }
}
