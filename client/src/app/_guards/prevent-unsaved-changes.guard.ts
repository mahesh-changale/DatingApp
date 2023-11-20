import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { inject } from '@angular/core';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  
  //const confirmService = inject(ConfirmService);
  
  if (component.editForm?.dirty) {
   // return confirmService.confirm();
   return confirm("unsaved changes")
  }
  
  return true;
};