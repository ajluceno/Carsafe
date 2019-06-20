import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public onRegisterForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
   email: string;
   fullName: string;
   password: string;
   

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public sesion : AutenticacionService,
    private formBuilder: FormBuilder
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])]
    });
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home');
    });
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
  
  tryRegister(){
    console.log(this.email, this.password, this.fullName);
    this.sesion.registerUser(this.email, this.password, this.fullName).then(auth => {
      this.navCtrl.navigateRoot('/home');
      console.log(auth)
    }).catch(err => console.log(err))
  }

}
