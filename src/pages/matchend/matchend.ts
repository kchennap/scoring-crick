import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';


/**
 * Generated class for the MatchendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matchend',
  templateUrl: 'matchend.html',
})
export class MatchendPage {

  overs;
  score;
  wickets;
  balls;
  overs_1;
  score_1;
  wickets_1;
  balls_1;
  players;
  overs_set;
  balls_set;
  innings;
  score_to_beat;
  run_rate;
  values = {};
  team;
  winstring;
  winner;
  winwick;
  winruns;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.overs = this.navParams.get('overs');
    this.score= this.navParams.get('score');
    this.wickets = this.navParams.get('wickets');
    this.balls = this.navParams.get('balls');

    this.overs_1 = this.navParams.get('overs_1');
    this.score_1= this.navParams.get('score_1');
    this.wickets_1 = this.navParams.get('wickets_1');
    this.balls_1 = this.navParams.get('balls_1');
    this.winner = this.navParams.get('winner');

    this.winwick = this.navParams.get('winwick');
    this.winruns = this.navParams.get('winruns');

    this.players = this.navParams.get('players');
    this.overs_set = this.navParams.get('overs_set');
    this.balls_set = this.overs_set*6;
    this.innings = this.navParams.get('innings');
    this.score_to_beat = this.score + 1;
    let runrate: number = this.score/this.overs_set;
    this.run_rate = runrate;
    this.team = this.navParams.get('team');

    if(this.winner == 1){
      this.winstring = "Team 1 wins by " + this.winruns + " runs!";
    }
    else {
      this.winstring = "Team 2 wins by " + this.winwick + " wickets!";
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchendPage');
  }

  nav_back(){
    this.navCtrl.setRoot(MainPage);
  }

}
