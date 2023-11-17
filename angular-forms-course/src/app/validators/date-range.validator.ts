import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    const start: Date = form.get("promoStartDateAt").value;
    const end: Date = form.get("promoEndDateAt").value;

    if (!start || !end) {
      return null;
    }

    const isRangValid = end?.getTime() - start?.getTime() > 0;

    return isRangValid ? null : { promoPeriod: true };
  };
}
