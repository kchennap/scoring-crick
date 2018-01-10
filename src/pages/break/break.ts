import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MainPage } from '../main/main';
import { Home_2Page } from '../home-2/home-2';

/**
 * Generated class for the BreakPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-break',
  templateUrl: 'break.html',
})
export class BreakPage {
  rootPage:any = MainPage;
  overs;
  score;
  wickets;
  balls;
  players;
  overs_set;
  balls_set;
  innings;
  score_to_beat;
  run_rate;
  values = {};
  team;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.overs = this.navParams.get('overs');
    this.score= this.navParams.get('score');
    this.wickets = this.navParams.get('wickets');
    this.balls = this.navParams.get('balls');
    this.players = this.navParams.get('players');
    this.overs_set = this.navParams.get('overs_set');
    this.balls_set = this.overs_set*6;
    this.innings = this.navParams.get('innings');
    this.score_to_beat = this.score + 1;
    let runrate: number = this.score/this.overs_set;
    this.run_rate = runrate;
    this.team = this.navParams.get('team');

    this.values = {
      overs: this.overs,
      score: this.score,
      wickets: this.wickets,
      balls: this.balls,
      players: this.players,
      overs_set: this.overs_set,
      innings: this.innings,
      score_to_beat: this.score_to_beat,
      run_rate: this.run_rate,
      team: this.team
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreakPage');
  }

  nav_back(){
    this.navCtrl.setRoot(Home_2Page, this.values);
  }

}
