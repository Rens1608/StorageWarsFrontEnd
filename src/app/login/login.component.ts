import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PlayerService} from '../services/playerService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../models/player';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  player: Player;
  loggedInPlayer: Player;
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService) {
      this.player = new Player();
  }

  async login() {
    if (this.form.valid) {
      try {
        this.player.name = this.form.get('username').value;
        this.player.password = this.form.get('password').value;
        this.playerService.login(this.player).pipe(first()).subscribe(data => this.loggedInPlayer = data);
        setTimeout(() => {
          console.log(this.loggedInPlayer);
          localStorage.setItem('currentPlayer', JSON.stringify(this.loggedInPlayer));
          this.gotoHomePage();
        }, 500);
        } catch (err) {
          this.loginInvalid = true;
        }
      } else {
        this.formSubmitAttempt = true;
      }
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.login();
  }

  gotoHomePage() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toRegister(){
    this.router.navigate(["/register"]);
  }

}
