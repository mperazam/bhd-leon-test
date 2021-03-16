import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CardsService } from 'src/app/services/cards/cards.service';
import { Card } from 'src/app/services/cards/dto/card';
import { Movement } from 'src/app/services/cards/dto/movement';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  slideOpts = {
    slidesPerView: 1.5
  };

  selectedCard: Card;
  cards: Card[];
  selectedCardMovements: Movement[];

  constructor(
    private loginService: LoginService,
    private cardsService: CardsService) { }

  ionViewWillEnter() {
    this.selectedCard = undefined;
    this.cards = undefined;
    this.selectedCardMovements = undefined;
    this.loginService.redirectToLogin();
    this.getCards();
  }

  getCards() {
    this.cardsService.getCards().subscribe(response => {
      this.cards = response;
      this.selectedCard = this.cards[0];
      this.getCardMovements(this.selectedCard);
    }, error => {
      console.log(error);
    });
  }

  getCardDisplayNumber(cardNumber: string): string {
    return "**** " + cardNumber.substr(cardNumber.length - 4);;
  }

  formatCurrency(amount: number) {
    if (isNaN(amount)) {
      return "-";
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return formatter.format(amount);
  }

  getCardIssuerLogo(issuerName: string) {
    if (issuerName.trim().toLowerCase() === "visa") {
      return "../../../assets/visa.svg";
    }
    return "../../../assets/mastercard.svg";
  }

  getCardMovements(card: Card) {
    this.selectedCardMovements = undefined;
    const productNumber = card.productNumber;
    this.cardsService.getCardMovements(productNumber).subscribe(response => {
      this.selectedCardMovements = response;
      this.selectedCardMovements.sort((a: Movement, b: Movement) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
      });
    }, error => {
      console.log(error);
    });
  }

  updateSelectedCard(card: Card) {
    this.selectedCard = card;
    this.getCardMovements(this.selectedCard);
  }

  formatDate(dateAsString: string) {
    const date = new Date(dateAsString);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
    const monthIndex = date.getMonth();
    const monthAsString = months[monthIndex];
    let day = date.getDate().toString();
    if (day.length < 2) {
      day = '0' + day;
    }
    return monthAsString + " " + day;
  }

}
