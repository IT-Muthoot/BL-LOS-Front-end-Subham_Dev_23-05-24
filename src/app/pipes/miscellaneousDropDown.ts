import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropDown',
  standalone: true,
})
export class MiscellaneousDropDownPipe implements PipeTransform {
  transform(
    value: any,
    type: any,
    dropDownArray: Array<{
      id: any;
      title: string;
      mid: any;
      cdDescription: string;
    }>
  ): string {
    if (type == 1) {
      if (!dropDownArray || !Array.isArray(dropDownArray)) {
        return 'NA';
      }
      const foundItem = dropDownArray.find((item) => item.id == value);
      return foundItem ? foundItem.title : 'NA';
    } else {
      if (!dropDownArray || !Array.isArray(dropDownArray)) {
        return 'NA';
      }
      const foundItem = dropDownArray.find((item) => item.id == value);
      return foundItem ? foundItem.title : 'NA';
    }
  }
}
