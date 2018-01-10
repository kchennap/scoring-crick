import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BreakPage } from '../break/break';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // rootPage:any = HomePage;
  score = 0;
  balls = 0;
  wickets = 0;
  overs = -1;
  preview = "";
  first_inn = {};
  innings;
  overs_set;
  free_hit;
  no_players;
  testRadioOpen;
  testRadioResult;
  no_balls;
  extra_runs;
  team;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
    this.score = 0;
    this.balls = 0;
    this.wickets = 0;
    this.overs = 0;
    this.preview = "";
    this.innings = 1;
    this.free_hit = false;
    this.first_inn = {};
    this.overs_set = this.navParams.get('overs');
    this.no_balls = this.overs_set*6;
    this.no_players = this.navParams.get('players');
    this.team = "Team A";
  }

  

  endMatch(){
      this.first_inn = {
        balls: this.balls,
        overs: this.overs,
        score: this.score,
        wickets: this.wickets,
        overs_set: this.overs_set,
        players: this.no_players,
        innings: this.innings,
        team: this.team
      };
      this.navCtrl.setRoot(BreakPage, this.first_inn);
  }

  ball_inc(){
    this.balls+=1;
    if(this.balls%6 == 0 && this.balls!=0){
      this.overs++;
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
    if(this.wickets == this.no_players){
      //alert('Match has Ended');
      this.endMatch();
    }
  }

  enter(){
    if(this.preview == ""){
      alert('Please enter a Value');
    } else if(this.preview == "WD" || this.preview == "NB" ||
              this.preview.substr(1, 2) == "WD" || this.preview.substr(1, 2) == "NB"){
      this.score += 1;
      this.score += parseInt(this.extra_runs);
    }
    else {
        this.ball_inc();
        if(this.preview != "W")
        {
          this.score += parseInt(this.preview);
        } else {
          this.wicket_inc();
          //this.showPrompt();
        }
    }
    this.preview = "";
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
  
  /* showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add Player',
      message: "Enter a name for new batsmen",
      inputs: [
        {
          name: 'title',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Saved clicked');
            console.log('Data is: ' + name);
          }
        }
      ]
    });
    prompt.present();
  }

  log(){
    console.log("Hello Dude");
  } */

}
