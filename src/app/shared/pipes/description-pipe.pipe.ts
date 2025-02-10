import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionPipe',
  standalone: true
})
export class DescriptionPipePipe implements PipeTransform {

  transform(value:string, isExpanded:boolean=false):string {
    if(!value)return '';
    return isExpanded?value:`${value.substring(0,140)}...`;
  }

}
