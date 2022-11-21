import { LightningElement } from 'lwc';
const SHORT_URL = 'https://api.shrtco.de/v2/shorten?url=';

export default class ShortURLGenerator extends LightningElement {
URL;
short_link;
short_link2;
short_link3;
details = false;

updateURL(event){
    this.URL = event.target.value;
}

    getUrls() {
        if(this.URL) {
            this.urls = {};
            fetch(SHORT_URL + this.URL)
            .then(response => {
                console.log(response);
                if(response.ok) {
                    return response.json();
                } else {
                    throw Error(response);
                }
            })
            .then(links => {
                this.details = true;
                if(links.result){
                    this.short_link= links.result.full_short_link;
                    this.short_link2= links.result.full_short_link2;
                    this.short_link3= links.result.full_short_link3;
                }
            })
            .catch(error => console.log(error))
        } else {
            alert('Please enter a url');
        }
    }

    clear(){
        this.URL = null;
        this.details=false;
        this.original_link = null;
        this.short_link=null;
        this.short_link2=null;
        this.short_link3=null;
    }

}