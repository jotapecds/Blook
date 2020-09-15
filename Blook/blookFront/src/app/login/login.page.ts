import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

/*Toast*/
import { ToastController } from '@ionic/angular';


/* Services */
import { AuthService } from "./../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


loginForm:FormGroup;

  constructor(public formBuilder : FormBuilder,
              public router: Router,
              public authService: AuthService,
              public toastController :ToastController
             ) { 
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required,Validators.minLength(8)]]
    });
    
  }

  backToHome() {
    this.router.navigate(['/feed']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login efetuado com sucesso!',
      duration: 2000,
      color:"dark"
    });
    toast.present();
  }

  submitLogin(form){
    console.log(form);

    this.authService.login(form.value).subscribe (
      (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.success.token);
        console.log("entrei");
        this.router.navigate(['/feed']).then(()=>window.location.reload());
/*         if (this.router.url === '/feed') {
          window.location.reload();
        } */
      }, (err) => {
        console.log(err);
      }
    );

    
  }

 
  ngOnInit() {
  }

}
