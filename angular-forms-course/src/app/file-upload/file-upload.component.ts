import { Component, Input } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { catchError, finalize } from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { noop, of } from "rxjs";
import { FileChangeEvent } from "@angular/compiler-cli/src/perform_watch";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input()
  requiredFileType = "";

  fileName = "";

  fileUploadError = false;

  uploadProgress = 0;

  onChange = (arg: string) => {};
  onTouch = () => {};
  onValidatorChange = () => {};

  disabled = false;
  fileUploadSuccess = false;

  constructor(private http: HttpClient) {}

  onFileSelection(event) {
    const file = event.target.files?.[0];

    this.fileName = file.name;

    const formData = new FormData();

    formData.append("thumbnail", file);

    this.http
      .post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        catchError((error) => {
          this.fileUploadError = true;

          return of(error);
        }),
        finalize(() => (this.uploadProgress = 0)),
      )
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);

          return;
        }

        if (event.type === HttpEventType.Response) {
          this.fileUploadSuccess = true;
          this.onChange(this.fileName);
          this.onValidatorChange();
        }
      });
  }

  writeValue(value: any) {
    this.fileName = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: any) {
    this.onTouch = onTouch;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouch();

    fileUpload.click();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }

    return this.fileUploadError
      ? { uploadFailed: true }
      : { requiredFileType: this.requiredFileType };
  }

  registerOnValidatorChange(onValidatorChange: () => void) {}
}
