import { CanDeactivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
export const authDeactiveGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const auth = inject(AuthService)
  if (confirm("Logout?")) {
    auth.removeToken();
    return true;
  }
  return false;
};
