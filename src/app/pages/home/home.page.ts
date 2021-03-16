import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Credentials } from 'src/app/services/login/dto/credentials';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginForm: FormGroup;
  buttonEnabled: boolean;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
      rememberUser: [false]
    });
  }

  ionViewWillEnter() {
    this.loginService.doInternalLogin();
    this.buttonEnabled = true;
    this.resetFormValues();
  }

  doLogin() {
    const formValues = this.loginForm.value;
    const username: string = formValues.id.trim();
    const password: string = formValues.password;
    if (username.length === 0 || password.length === 0) {
      this.loginForm.controls['id'].markAsDirty();
      this.loginForm.controls['password'].markAsDirty();
      return;
    }
    const credentials = new Credentials();
    credentials.username = username;
    credentials.password = password;
    this.updateButtonEnabledStatus(false);
    this.loginService.logIn(credentials).subscribe(response => {
      this.loginService.setToken(response.token);
      const rememberUser: boolean = formValues.rememberUser;
      if (rememberUser) {
        this.loginService.setUsername(username);
      }
      this.router.navigateByUrl('/tabs');
    }, error => {
      console.log(error);
      let errorMsg = "Ocurrió un error en el inicio de sesión";
      if (error.status === 401) {
        errorMsg = "Usuario o contraseña incorrectos";
      }
      this.alertsService.presentToast(errorMsg, undefined, "danger", "top");
      this.updateButtonEnabledStatus(true);
    });
  }

  toggleRememberUser(event: CustomEvent) {
    this.loginForm.patchValue({
      rememberUser: event.detail.checked
    });
  }

  updateButtonEnabledStatus(enabled: boolean) {
    this.buttonEnabled = enabled;
  }

  resetFormValues() {
    this.loginForm.patchValue({
      id: '',
      password: ''
    });
    this.loginForm.controls['id'].markAsPristine();
    this.loginForm.controls['password'].markAsPristine();
  }

}
