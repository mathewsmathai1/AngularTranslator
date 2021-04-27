import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translatorapp';
  buttonText = '';
  buttonDisplay = 'Click to translate';
  source : any;
  target : any;

 /* whenbuttonclicked(textToBeTranslated : HTMLInputElement)
  {
       this.clicked(textToBeTranslated.value);
       console.log("HEY THERE");
  } */
  async clicked(textToBeTranslated : HTMLInputElement)
  {
    this.buttonDisplay = "Button Clicked"
    console.log("Hello");
    document.getElementById('b1').innerHTML="Clicked";
    //let link ='http://localhost:5002/translate?source=en&target=es&text=Iam%20are%20awesome%2C%20my%20Friend.';
    let link =`https://therealtranslator.herokuapp.com/translate?source=${this.source}&target=${this.target}&text=${encodeURI(textToBeTranslated.value)}`

   // this.buttonText = textToBeTranslated.value;

    await axios.get(link)
  .then((response) => {
    console.log("Response: ",response)
    this.buttonText = response.data
  }).
  catch(err=>{
    console.log("Error: ",err);
  });
  console.log("LATER");
  }
}
