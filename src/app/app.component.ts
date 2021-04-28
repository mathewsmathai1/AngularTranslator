import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translatorapp';
  translatedText = '';
  buttonDisplay = 'Click to translate';
  source : any;
  target : any;

  mainForm : FormGroup;

 /* whenbuttonclicked(textToBeTranslated : HTMLInputElement)
  {
       this.clicked(textToBeTranslated.value);
       console.log("HEY THERE");
  } */

  constructor(fBuilder : FormBuilder)
  {
     this.mainForm = fBuilder.group({'textToBeTranslated':[],'source':['',Validators.required],'target':[],'submit':[]});
  }

  setAllAsTouched() : boolean //sets all felds as touched to validate on submit
  {
    this.mainForm.markAllAsTouched();
    console.log("Boolean For Touched: "+this.mainForm.controls['source'].touched)
    return true;
  }
  async clicked()
  {
    this.buttonDisplay = "Translating Current Text";
    console.log("Hello");
    //document.getElementById('b1').innerHTML="Clicked";

    console.log("Print Value of Source: "+this.mainForm.get('source').value);
    //let link ='http://localhost:5002/translate?source=en&target=es&text=Iam%20are%20awesome%2C%20my%20Friend.';
    let link =`https://therealtranslator.herokuapp.com/translate?source=${this.mainForm.get('source').value}&target=${this.mainForm.get('target').value}&text=${encodeURI(this.mainForm.get('textToBeTranslated').value)}`

   // this.buttonText = textToBeTranslated.value;

    await axios.get(link)
  .then((response) => {
    console.log("Response: ",response)
    this.translatedText = response.data;
    this.buttonDisplay = "Click To Translate";
  }).
  catch(err=>{
    console.log("Error: ",err);
  });
  console.log("LATER");
  }
}
