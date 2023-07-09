import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {
  transform(keywords: any, searchString?: any):any {
    if(keywords.length === 0 || searchString === ''){
      return keywords;
    }
    else{
      return keywords.filter((result:any) => {
        return result.artistName.toLowerCase() === searchString?.toLowerCase();
      })
    }
  }
}
