import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'translatorapp';
  translatedText = '';
  buttonDisplay = 'Click to translate';
  source : any;
  target : any;
   languages : any;
   languages_list : any;
  mainForm : FormGroup;
  showForm : boolean;

  ngOnInit(): void {
    console.log("App Initialized");
   this.getLanguageList();
  }



 /* whenbuttonclicked(textToBeTranslated : HTMLInputElement)
  {
       this.clicked(textToBeTranslated.value);
       console.log("HEY THERE");
  } */

  constructor(fBuilder : FormBuilder)
  {
     this.mainForm = fBuilder.group({'textToBeTranslated':['',Validators.required],'source':['English'],'target':['Afrikaans'],'submit':[]});
  }

  async getLanguageList(){
    console.log("Inside async");
    //let link =`http://localhost:5002/languages/`
    let link =`https://therealtranslator.herokuapp.com/languages/`
    console.log("LINK: "+link);
    await axios.get(link)
    .then((response) => {
      console.log("Response Language: ",response.data);
      //this.languages = response.data;
      this.languages_list = response.data.map((arrElement)=>{ return arrElement.language_name});
      //this.languages= response.data.map((arrElement)=>{ return {[arrElement.language] : arrElement.language_name}});
      this.languages = {};
      for (var i=0, len=response.data.length; i < len; i++) {
        this.languages[response.data[i].language_name] = response.data[i].language;
    }

    console.log(this.languages_list);
      /*this.languages.forEach(element => {
        var index = this.languages.indexOf(element);
        var temp_array =  this.languages;
       this.languages[index] = {temp_array[index] : response.data[index].language};
        
      });
      this.languages.keys = response.data.map((arrElement)=>{ {arrElement.language}}); */
      this.showForm = true;
     // this.translatedText = response.data;
     // this.buttonDisplay = "Click To Translate";
    }).
    catch(err=>{
      console.log("Error: ",err);
    });
    //return true;
  }

  setAllAsTouched() : boolean //sets all felds as touched to validate on submit
  {
    this.mainForm.markAllAsTouched();
    console.log("Boolean For Touched: "+this.mainForm.controls['source'].touched);
    //console.log("Touched LANGUAGES?: "+this.mainForm.controls['languages'].touched);
   // console.log("VALUE OF LANGUAGES: "+this.mainForm.controls['languages'].value);
    return true;
  }
  async clicked()
  {
    this.buttonDisplay = "Translating Current Text";
    console.log("Hello");
    //document.getElementById('b1').innerHTML="Clicked";

    console.log("Print Value of Source: "+this.mainForm.get('source').value);
    console.log("Print Value of language_code: "+this.languages[this.mainForm.get('source').value]);
    let source_lang = this.mainForm.get('source');

    //let link ='http://localhost:5002/translate?source=en&target=es&text=Iam%20are%20awesome%2C%20my%20Friend.';
    let link =`https://therealtranslator.herokuapp.com/translate?source=${[this.languages[this.mainForm.get('source').value]]}&target=${[this.languages[this.mainForm.get('target').value]]}&text=${encodeURI(this.mainForm.get('textToBeTranslated').value)}`;
    //let link =`http://localhost:5002/translate?source=${[this.languages[this.mainForm.get('source').value]]}&target=${[this.languages[this.mainForm.get('target').value]]}&text=${encodeURI(this.mainForm.get('textToBeTranslated').value)}`
    console.log("LINK: "+link);
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
