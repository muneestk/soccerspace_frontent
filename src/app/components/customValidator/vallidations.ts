import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class TrimValidator {
  static trim(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const trimmedValue = control.value.trim();
        if (trimmedValue !== control.value) {
          return { trimError: true };
        }
      }
      return null;
    };
  }
}
