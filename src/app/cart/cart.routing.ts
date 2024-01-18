import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];

export const CartRoutes = RouterModule.forChild(routes);
