import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseSortParamsPipe implements PipeTransform {
  transform(value: string[]): string {
    if (value.length === 0) {
      return null;
    } else {
      return value
        .map((sortParam) => {
          if (sortParam.includes(' desc')) {
            return `-${sortParam.replace(' desc', '')}`;
          } else {
            return sortParam;
          }
        })
        .reduce((previousSortParam, currentSortParam) => {
          return `${previousSortParam} ${currentSortParam}`;
        });
    }
  }
}
