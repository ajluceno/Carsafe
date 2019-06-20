import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'login', loadChildren: './autenticacion/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './autenticacion/registro/registro.module#RegistroPageModule' },
  { path: 'perfil', loadChildren: './autenticacion/perfil/perfil.module#PerfilPageModule' },
  { path: 'edit-perfil', loadChildren: './autenticacion/edit-perfil/edit-perfil.module#EditPerfilPageModule' },
  { path: 'configuracion', loadChildren: './menu/configuracion/configuracion.module#ConfiguracionPageModule' },
  { path: 'about', loadChildren: './menu/about/about.module#AboutPageModule' },
  { path: 'anadir', loadChildren: './menu/anadir/anadir.module#AnadirPageModule' },
  { path: 'mapa', loadChildren: './mapa/mapa.module#MapaPageModule' },
  { path: 'home-modal', loadChildren: './home-modal/home-modal.module#HomeModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
