import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { courseTitleValidator } from "../../validators/course-title.validator";

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.coursesService)],
        updateOn: "blur",
      },
    ],
    releasedAt: [new Date(), Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ["", [Validators.required, Validators.minLength(10)]],
    category: ["BEGINNER", Validators.required],
    address: [null, Validators.required],
  });

  courseCategories$: Observable<CourseCategory[]>;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
  ) {}

  ngOnInit() {
    this.courseCategories$ = this.coursesService.findCourseCategories();

    const draft = localStorage.getItem("SET_1");

    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((values) =>
        localStorage.setItem("SET_1", JSON.stringify(values)),
      );
  }

  get courseTitle() {
    return this.form.controls["title"];
  }
}
