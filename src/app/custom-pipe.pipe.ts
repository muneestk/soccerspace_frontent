import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: any): boolean {
    // Check your condition
    return value.Teams.length === value.slots;
  }

}
