import { Component, OnInit } from "@angular/core";
import * as toastr from "toastr";

export class ToastrService implements OnInit {
  ngOnInit() {
    toastr.options = {
      preventDuplicates: true,
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true
    };
  }

  public showErrorMessage(message: string) {
    toastr.error(message);
  }

  public showErrors(validationErrorDictionary: any) {
    if (validationErrorDictionary.errors) {
      const errors = validationErrorDictionary.errors;
      for (const errorName in errors) {
        const errorMessages = errors[errorName];
        for (const messageIndex in errorMessages) {
          toastr.error(errorMessages[messageIndex]);
        }
      }
    } else {
      //JSON.parse(err);
      for (const fieldName in validationErrorDictionary) {
        if (validationErrorDictionary.hasOwnProperty(fieldName)) {
          //if (form.controls[fieldName]) {
          // integrate into angular's validation if we have field validation
          //form.controls[fieldName].setErrors({ invalid: true });
          //}
          // if we have cross field validation then show the validation error at the top of the screen
          const error: string[] = [];
          error.push(validationErrorDictionary[fieldName]);
          //this.errors[fieldName] = [];
          //this.errors[fieldName].push(error);
          let errorMessage = validationErrorDictionary[fieldName];
          toastr.error(errorMessage);
        }
      }
    }
  }
}
