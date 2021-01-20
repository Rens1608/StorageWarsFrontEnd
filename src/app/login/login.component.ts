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
  loggedInPlayer: Player | undefined;
  form!: FormGroup;
  public loginInvalid: boolean | undefined;
  private formSubmitAttempt: boolean | undefined;
  private returnUrl: string | undefined;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService) {
      this.player = new Player();
  }

  async login(): Promise<void> {
    // @ts-ignore
    if (this.form.valid) {
      try {
        // @ts-ignore
        this.player.name = this.form.get('username').value;
        // @ts-ignore
        this.player.password = this.form.get('password').value;
        this.playerService.login(this.player).pipe(first()).subscribe(data => this.loggedInPlayer = data);
        setTimeout(() => {
          console.log(this.loggedInPlayer);
          sessionStorage.setItem('currentPlayer', JSON.stringify(this.loggedInPlayer));
          setTimeout(() => {
            this.gotoHomePage();
          }, 1000);
        }, 1000);
        } catch (err) {
          this.loginInvalid = true;
        }
      } else {
        this.formSubmitAttempt = true;
      }
  }

  onSubmit(): void {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.login();
  }

  gotoHomePage(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toRegister(): void{
    this.router.navigate(['/register']);
  }

}
