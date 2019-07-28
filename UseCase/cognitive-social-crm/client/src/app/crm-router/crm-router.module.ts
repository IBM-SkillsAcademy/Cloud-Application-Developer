import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TweetsComponent } from '../components/tweets/tweets.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthComponent } from '../components/authentication/auth.component';

const routes: Routes = [
  {
    path: 'analysis',
    component: DashboardComponent,
  },
  {
    path: 'tweets',
    component: TweetsComponent,
  },
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
  ],
})
export class CrmRouterModule { }
