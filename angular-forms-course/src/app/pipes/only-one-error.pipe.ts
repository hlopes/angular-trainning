import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform{
  transform(allErrors: any, errorsPriority: string[]): any {
    if(!allErrors) {
      return null
    }

    return errorsPriority.reduce((acc, prio) => {
      if(allErrors[prio] && !Object.keys(acc).length) {
        return {[prio]: allErrors[prio]}
      }

      return acc
    }, {})
  }

}
