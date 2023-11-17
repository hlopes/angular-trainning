import { AsyncValidatorFn } from "@angular/forms";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";

export function courseTitleValidator(
  coursesService: CoursesService,
): AsyncValidatorFn {
  return (control) => {
    return coursesService.findAllCourses().pipe(
      map((courses) => {
        const foundCourse = courses.find(
          (course) =>
            course.description.toLowerCase() === control.value.toLowerCase(),
        );

        return foundCourse ? { titleExists: true } : null;
      }),
    );
  };
}
