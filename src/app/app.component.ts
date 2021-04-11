import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http'  
import { element } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  form!: FormGroup
  li: any
  lis = []
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"

  tutorData: Array<String> = ['Mango', 'Grapes']; 

  constructor(public formBuilder: FormBuilder, private http: HttpClient){

  }

  ngOnInit(): void{
    this.form = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    major: new FormControl('',[Validators.required]), 
    phoneno: new FormControl('',[Validators.required,Validators.pattern(this.mobNumberPattern)]), 
    felony: new FormControl('', [Validators.required]), 
    chess: new FormControl('', [Validators.required]), 
    favtutor: this.addTutorControls(),
    learn: new FormControl('', [Validators.required]),
   })
  }


  addTutorControls(){
    const arr = this.tutorData.map(element=>{
      return this.formBuilder.control(false)
    })
  }

  changeSelection(){
    this.li = this.tutorData.filter((value, index) => 
   {
    
      return value
   } 
  )
  }



  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
    this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe(Response => {

        console.log(Response)
        this.li = Response

        console.log(this.li.userId)
      })

  }
  
}

 