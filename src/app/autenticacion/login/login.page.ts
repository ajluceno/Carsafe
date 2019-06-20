import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  errorMessage: string = '';
  email: string;
   password: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public sesion : AutenticacionService,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    let autoHide: boolean = true;
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }


  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/registro');
  }



  loginUser(){
    this.sesion.loginUser(this.email, this.password)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/home');
    }, err => {
      alert("Revise su usuario y/o contraseña");
    })
  }
 



}
