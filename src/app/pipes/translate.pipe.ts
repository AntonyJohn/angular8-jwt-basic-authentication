import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs';
import { GlobalService } from '../global-service';


@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private global: GlobalService) {}
  transform(key: any): any {
    // // console.log('TransFormKey',key)
    var str = String(key).split(":")
    // // console.log('MY Datata',key,str)
    if(str.length > 1){
      if(String(str[1]).toLowerCase() == "array"){
        var arr = String(str[0]).split("|")
        return this.global.pageContent[arr[0]][arr[1]][arr[2]]
      }else if(String(str[1]).toLowerCase() == "object"){
        var arr = String(str[0]).split("|")
        return this.global.pageContent[arr[0]][arr[1]]
      }
    }else{
      // // console.log('MY Datata',key,str)
      
      return this.global.pageContent[key] || key;
    }
    
  }

}
