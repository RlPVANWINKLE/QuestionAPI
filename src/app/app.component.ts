import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Result!: string;
  async NewQuestion(){
    let Question = (<HTMLInputElement>document.getElementById('header')).value;
    let Answer = (<HTMLInputElement>document.getElementById('description')).value;
    let KeyWords = (<HTMLInputElement>document.getElementById('tags')).value;
    let Category = (<HTMLInputElement>document.getElementById('category')).value;

    let send = {
      category: Question,
      description: Answer,
      header: KeyWords,
      tags: Category
    }
    const response = await fetch('https://wmzeeupjd57owgpb2hjeciiq5e0huipa.lambda-url.us-east-2.on.aws/new-question/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(send)
    })
    this.Result = await response.status.toString();
    
    if(this.Result == '200'){
      (<HTMLInputElement>document.getElementById('header')).value = '';
      (<HTMLInputElement>document.getElementById('description')).value = '';
      (<HTMLInputElement>document.getElementById('tags')).value = '';
      (<HTMLInputElement>document.getElementById('category')).value = 'Payroll';
    }
    setTimeout(() => {
      this.Result = ''
    }, 1500);
  }
}
