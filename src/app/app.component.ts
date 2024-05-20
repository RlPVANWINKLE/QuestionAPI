import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  async ngOnInit() {
    this.loading = true;
    const response = await fetch('https://wmzeeupjd57owgpb2hjeciiq5e0huipa.lambda-url.us-east-2.on.aws/All/',{
      method: 'GET'
    })
    const result = await response.json();
    this.PastData = result;
    this.FilteredData = this.PastData;
    this.loading = false;
  }
  submissiontype:string = 'new'
  update!:any;
  Search!: any;
  PostResult!: string;
  PastData!: any;
  FilteredData!:any;
  loading:boolean = false;
  async NewQuestion(){
    let Question = (<HTMLInputElement>document.getElementById('header')).value;
    let Answer = (<HTMLInputElement>document.getElementById('description')).value;
    let KeyWords = (<HTMLInputElement>document.getElementById('tags')).value;
    let Category = (<HTMLInputElement>document.getElementById('category')).value;

    let send = {
      category: Category,
      description: Answer,
      header: Question,
      tags: KeyWords
    }
    const response = await fetch('https://wmzeeupjd57owgpb2hjeciiq5e0huipa.lambda-url.us-east-2.on.aws/new-question/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(send)
    })
    this.PostResult = await response.status.toString();

    if(this.PostResult == '200'){
      (<HTMLInputElement>document.getElementById('header')).value = '';
      (<HTMLInputElement>document.getElementById('description')).value = '';
      (<HTMLInputElement>document.getElementById('tags')).value = '';
      (<HTMLInputElement>document.getElementById('category')).value = 'Payroll';
    }
    setTimeout(() => {
      this.PostResult = ''
    }, 1500);
    this.ngOnInit();
  }
  async UpdateQuestion(){
    let Question = (<HTMLInputElement>document.getElementById('header')).value;
    let Answer = (<HTMLInputElement>document.getElementById('description')).value;
    let KeyWords = (<HTMLInputElement>document.getElementById('tags')).value;
    let Category = (<HTMLInputElement>document.getElementById('category')).value;

    let send = {
      category: Category,
      description: Answer,
      header: Question,
      tags: KeyWords
    }
    const response = await fetch(`https://wmzeeupjd57owgpb2hjeciiq5e0huipa.lambda-url.us-east-2.on.aws/update-question/${this.update._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(send)
    })
    console.log(await response.status.toString());
    (<HTMLInputElement>document.getElementById('header')).value = '';
    (<HTMLInputElement>document.getElementById('description')).value = '';
    (<HTMLInputElement>document.getElementById('tags')).value = '';
    (<HTMLInputElement>document.getElementById('category')).value = 'Payroll';
    this.submissiontype = 'new'
    this.ngOnInit();
  }
  async search(){
    let text = (<HTMLInputElement>document.getElementById('search')).value;
    text = text.toLocaleLowerCase()
    this.FilteredData = []
    this.PastData.forEach((element:any) => {
      let header = (element.header).toString().toLowerCase();
      let description = (element.description).toString().toLowerCase();
      let tags = (element.tags).toString().toLowerCase();
      let category = (element.category).toString().toLowerCase();
      if(header.includes(text) || description.includes(text) || tags.includes(text) || tags.includes(text)){
        this.FilteredData.push(element)
      }
    });
    (<HTMLInputElement>document.getElementById('search')).value = '';
  }
  QuestionClick(question:any){
    console.log(question)
    this.submissiontype = 'update';
    this.update = question;
    (<HTMLInputElement>document.getElementById('header')).value = question.header;
      (<HTMLInputElement>document.getElementById('description')).value = question.description;
      (<HTMLInputElement>document.getElementById('tags')).value = question.tags;
      (<HTMLInputElement>document.getElementById('category')).value = question.category;
  }
}
