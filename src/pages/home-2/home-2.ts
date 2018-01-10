import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BreakPage } from '../break/break';
import { AlertController } from 'ionic-angular';
import { MatchendPage } from '../matchend/matchend';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the Home_2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-2',
  templateUrl: 'home-2.html',
})
export class Home_2Page {

  overs;
  score;
  winwick;
  winruns;
  wickets;
  balls;
  players;
  overs_set;
  innings;
  afirst = "";
  preview = "";
  score_to_beat;
  run_rate;
  testRadioOpen;
  testRadioResult;
  first_inn;
  second_inn;
  balls_left;
  score_left;
  extra_runs;
  overs_1;
  score_1;
  balls_1;
  wickets_1;
  team;
  winner;
  required_runrate;
  overs_left;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.players = this.navParams.get('players');
    this.overs_set = this.navParams.get('overs_set');
    this.balls_left = this.overs_set*6;

    this.overs_1 = this.navParams.get('overs');
    this.score_1= this.navParams.get('score');
    this.wickets_1 = this.navParams.get('wickets');
    this.balls_1 = this.navParams.get('balls');

    this.score_to_beat = this.navParams.get('score_to_beat'); + 1;
    this.score_left = this.score_to_beat;
    this.score = 0;
    this.balls = 0;
    this.wickets = 0;
    this.overs = 0;
    this.overs_left = this.overs_set;
    this.preview = "";
    this.second_inn = {};
    this.required_runrate =  this.score/this.overs_set;
    this.innings = 2;
    this.team = "";
    this.winner = 0;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home_2Page');
  }

  endMatch(){
    this.winwick = this.players - this.wickets;
    this.winruns = this.score_to_beat - this.score;
    if(this.score_left <=0){
      alert("Team 2 wins by " + this.winwick + " wickets!");
      this.winner = 2;
    } else {
      alert("Team 1 wins by " + this.winruns + " runs!");
      this.winner = 1;
    }



    this.second_inn = {
      balls_1: this.balls,
      overs_1: this.overs,
      score_1: this.score,
      wickets_1: this.wickets,
      balls: this.balls,
      overs: this.overs,
      score: this.score,
      wickets: this.wickets,
      overs_set: this.overs_set,
      players: this.players,
      innings: this.innings,
      winner: this.winner,
      winwick: this.winwick,
      winruns: this.winruns
    };
    this.navCtrl.setRoot(MatchendPage, this.second_inn);
}

ball_inc(){
  this.balls+=1;
  this.balls_left-=1;
  if(this.balls%6 == 0 && this.balls!=0){
    this.overs++;
    this.runRate();
    this.overs_left--;
    if(this.overs == this.overs_set){
      this.endMatch();
    }
  }
}

extras() {
  this.showRadio3();
  this.showRadio2();
  
}




wicket_inc(){
  // this.showRadio();
  this.wickets += 1;
  if(this.wickets == this.players){
    //alert('Match has Ended');
    this.endMatch();
  }
}

runRate() {
  this.run_rate = this.score/this.overs;
  this.required_runrate =  this.score/this.overs_left;

  let toast = this.toastCtrl.create({
    message: 'Current RunRate: ' + this.run_rate + "\n" + 'Required Run Rate: ' + this.required_runrate,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

enter(){
  if(!this.preview){
    alert('Please enter a Value');
  }
  else if(this.preview == "WD" || this.preview == "NB" ||
  this.preview.substr(1, 2) == "WD" || this.preview.substr(1, 2) == "NB"){
  this.score += 1;
  this.score += parseInt(this.extra_runs);
}
  else {
      this.ball_inc();
      if(this.preview != "W")
      {
        this.score += parseInt(this.preview);
        this.score_left -= parseInt(this.preview);
        if(this.score_left <= 0){
          this.endMatch();
        }
      } else {
        this.wicket_inc();
        //this.showPrompt();
      }
    this.preview = "";
    
  }
  
}

add(value){
  this.preview = value.toString();
}

wicket(){
  this.preview = "W"
}

showRadio3() {
  let alert = this.alertCtrl.create();
  alert.setTitle('Any added runs?');

  alert.addInput({
    type: 'radio',
    label: '0',
    value: '0',
    checked: true
  }); // bowled

  alert.addInput({
    type: 'radio',
    label: '1',
    value: '1'
  }); // caught

  alert.addInput({
    type: 'radio',
    label: '2',
    value: '2'
  });

  alert.addInput({
    type: 'radio',
    label: '3',
    value: '3'
  });

  alert.addInput({
    type: 'radio',
    label: '4',
    value: '4'
  });

  alert.addInput({
    type: 'radio',
    label: '5',
    value: '5'
  });

  alert.addInput({
    type: 'radio',
    label: '6',
    value: '6'
  });


  alert.addButton({
    text:'Cancel',
    handler: data => {
      
      //this.balls -= 1;
    }
  });
  alert.addButton({
    text: 'OK',
    handler: data => {
      //this.wickets += 1;
      this.testRadioOpen = false;
      this.testRadioResult = data;
      this.extra_runs = data;
      this.preview = this.extra_runs + this.preview;
    }
  });
  
  alert.present();
}


showRadio2() {
  let alert = this.alertCtrl.create();
  alert.setTitle('Extra');

  alert.addInput({
    type: 'radio',
    label: 'No Ball',
    value: 'NB',
    checked: true
  }); // bowled

  alert.addInput({
    type: 'radio',
    label: 'Wide',
    value: 'WD'
  }); // caught


  alert.addButton({
    text:'Cancel',
    handler: data => {
      
      //this.balls -= 1;
    }
  });
  alert.addButton({
    text: 'OK',
    handler: data => {
      //this.wickets += 1;
      this.testRadioOpen = false;
      this.testRadioResult = data;
      this.preview = data;
    }
  });
  
  alert.present();
}

showRadio() {
  let alert = this.alertCtrl.create();
  alert.setTitle('Wicket');

  alert.addInput({
    type: 'radio',
    label: 'Bowled',
    value: 'wick-1',
    checked: true
  }); // bowled

  alert.addInput({
    type: 'radio',
    label: 'Caught',
    value: 'wick-2'
  }); // caught

  alert.addInput({
    type: 'radio',
    label: 'Stumped',
    value: 'wick-3'
  }); // stump

  alert.addInput({
    type: 'radio',
    label: 'Run Out',
    value: 'wick-4'
  }); // run out

  alert.addInput({
    type: 'radio',
    label: 'Hit Wicket',
    value: 'wick-5'
  }); // hit wicket

  alert.addInput({
    type: 'radio',
    label: 'LBW',
    value: 'wick-6'
  }); // lbw

  alert.addInput({
    type: 'radio',
    label: 'Retired Hurt',
    value: 'wick-7'
  }); // retired

  alert.addButton({
    text:'Cancel',
    handler: data => {
      //this.balls -= 1;
    }
  });
  alert.addButton({
    text: 'OK',
    handler: data => {
      //this.wickets += 1;
      this.testRadioOpen = false;
      this.testRadioResult = data;
    }
  });
  alert.present();
}


}
