import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { element } from 'protractor';




export interface SexOffender {
  agency: string;
  agency_zipcode: string;
  place: string;
  sex_offender_: string;
  sex_offender_address_line1: string;
  sex_offender_address_line2: string;
  sex_offender_birthdate: string;
  sex_offender_hair: string;
  sex_offender_height: string;
  sex_offender_image_url: string;
  sex_offender_name: string;
  sex_offender_race: string;
  sex_offender_sex: string;
  sex_offender_weight: string;
  sex_offender_zip_code: string;
}

export interface RepsonseSexOffender {
  pages_count: number;
  sex_offenders_count: number;
  sex_offenders: Array<SexOffender>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{


  public show = true;
  public thanks = false;
  form!: FormGroup;
  li: any;
  lis = [];
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  tutorData: Array<String> = ['Mango', 'Grapes'];

  constructor(public formBuilder: FormBuilder, private http: HttpClient){

  }

  ngOnInit(): void{
    this.form = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    major: new FormControl('', [Validators.required]),
    phoneno: new FormControl('', [Validators.required, Validators.pattern(this.mobNumberPattern)]),
    zipcode: new FormControl('', [Validators.required]),
    felony: new FormControl('', [Validators.required]),
    chess: new FormControl('', [Validators.required]),
    favtutor: this.addTutorControls(),
    learn: new FormControl('', [Validators.required]),
   });
  }


  addTutorControls(){
    const arr = this.tutorData.map(element => {
      return this.formBuilder.control(false);
    });
  }

  changeSelection(){
    this.li = this.tutorData.filter((value, index) =>
   {

      return value;
   }
  );
  }




  get f(){
    return this.form.controls;
  }

  // tslint:disable-next-line:typedef
  submit(){
    // Debug form values
    let bodytext =
      `Name: ${this.form.value.name}\n
        email: ${this.form.value.email}\n
        major: ${this.form.value.major}\n
        phone: ${this.form.value.phoneno}\n
        zipcode: ${this.form.value.zipcode}\n
        Was convicted: ${this.form.value.felony}\n
        Chees expirence: ${this.form.value.chess}\n
        Chees expirence: ${this.form.value.chess}\n`;


    // Set headers to submit the request to api



    // Build the request and do it.
    // tslint:disable-next-line:max-line-length
    // @todo Change APIKEY for the crimeometer apikey
    const headers = {
      'x-api-key': APIKEY
      };
    //this.http.get('https://api.crimeometer.com/v2/sex-offenders/records?zipcode=' + this.form.value.zipcode + '&exact_name=' + this.form.value.name,
    this.http.get<RepsonseSexOffender>('https://api.crimeometer.com/v2/sex-offenders/records?zipcode=11212&name=David Bosmond',
      {headers})
      .subscribe(response => {
        let body = new HttpParams();

        if (response.sex_offenders_count) {
          bodytext += 'Sex offenders found : ' + response.sex_offenders_count;
          if (response.sex_offenders)
          {
            response.sex_offenders.forEach(s => {
              bodytext += `-------------\n
                Name: ${s.sex_offender_name}\n
                Agency: ${s.agency}\n
                Agency zip code: ${s.agency_zipcode}\n
                Place: ${s.place}\n
                sex_offender_: ${s.sex_offender_}\n
                Address: ${s.sex_offender_address_line1}\n
                 ${s.sex_offender_address_line2}\n
                Birthdate: ${s.sex_offender_birthdate}\n
                Hair: ${s.sex_offender_hair}\n
                Height: ${s.sex_offender_height}\n
                Image_url: ${s.sex_offender_image_url}\n
                Race: ${s.sex_offender_race}\n
                Sex: ${s.sex_offender_sex}\n
                Weight: ${s.sex_offender_weight}\n
                Zip Code: ${s.sex_offender_zip_code}\n`;
            });
          }
        }
        body = body.set('body', bodytext);
        const headers = new HttpHeaders();
        // @todo Change domain.com by the real domain.
        this.http.post('http://domain.com/sendEmail.php',
          body,
          {headers})
          .subscribe(rsponsetwo => {
              this.show = false;
              this.thanks = true;
          });

      });
  }
}

