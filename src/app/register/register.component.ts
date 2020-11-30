import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PlayerService} from '../services/playerService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../models/player';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })

  export class RegisterComponent implements OnInit {
    player: Player;
    form: FormGroup | undefined;
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

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
        this.form = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.loginInvalid = false;
        this.formSubmitAttempt = false;
        this.register();
      }

    async register(): Promise<void>{
        // @ts-ignore
      if (this.form.valid){
            try{
              // @ts-ignore
              this.player.name = this.form.get('username').value;
              // @ts-ignore
              this.player.password = this.form.get('password').value;
              this.playerService.register(this.player).subscribe(() => this.goToHomePage());
            }catch (err){
               throw err;
            }
        }

    }
    goToHomePage(): void {
        this.router.navigate(['/']);
      }

  }
