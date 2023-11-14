import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ArticleFormValuesInterface } from './types/articleFormValues.interface'
import { BackendErrorsInterface } from '../../types/backendErrors.interface'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { BackendErrorsComponent } from '../backendErrors/backendErrors.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
  imports: [BackendErrorsComponent, CommonModule, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit {
  @Input()
  initialValues?: ArticleFormValuesInterface

  @Input()
  isSubmitting = false

  @Input()
  errors: BackendErrorsInterface | null = null

  @Output()
  articleSubmit = new EventEmitter<ArticleFormValuesInterface>()

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided')
    }

    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  onSubmit() {
    const formValues = this.form.getRawValue()

    const articleFormValues: ArticleFormValuesInterface = {
      ...formValues,
      tagList: formValues.tagList.split(' '),
    }

    this.articleSubmit.emit(articleFormValues)
  }
}
