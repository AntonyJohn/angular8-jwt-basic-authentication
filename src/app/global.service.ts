import { Injectable, EventEmitter, Output } from '@angular/core';
import { TranslateService } from './_services/translate.service';

@Injectable({
    providedIn: "root"
})
export class GlobalService { 

    constructor(public translate: TranslateService) {

    }

    public pageContent: any = {};
    public pageDir: string = "ltr";
    public menuContent: any = {};
    public commonContent: any = {};
    public landId: number = 1;

    //Event Emitters
    @Output() formLanguage: EventEmitter<any> = new EventEmitter();
    public selectLang: string = "en"
    //Language Setup
    public lang: any = [{
        name: "English",
        value: "en"
    },
    {
        name: "Arabic",
        value: "ar"
    }
    ];

    loadPageContent(url: string) {
        url = (url == '/') ? 'menu' : url
        /*if(url.includes('product?aci')){
            
            url ='portal/life/agent/getquote/quote/product';
        }*/
        console.log('urlNow:', url)
        this.pageContent = this.translate.data["menu"];
        for (let obj in this.translate.data) {
            if (String(url).includes(obj)) {
                this.pageContent = this.translate.data[obj];
                console.log("this.pageContent", url, obj)
                break;
            }
        }
    }

}