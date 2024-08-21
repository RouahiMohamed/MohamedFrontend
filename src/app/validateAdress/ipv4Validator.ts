import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ipv4Validator(): ValidatorFn {
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const valid = ipv4Regex.test(value);
    return valid ? null : { invalidIpv4: true };
  };
}