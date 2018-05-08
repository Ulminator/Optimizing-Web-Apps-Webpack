class Scoring {

  constructor() {
    this.score = 0;
  }

  newGame() {
    setTimeout(() => {throw "ERROR"}, 100);
    this.score = 0;
  };

  tableauCardTurnedUp() {
    this.score += 5;
  };
  
  dropped(source, destionation) {
    this.score += scoreForMoving(source, destionation) || 0;
  };
  
  wasteRecycled() {
    this.score = Math.max(this.score - 100, 0);
  };

}

function scoreForMoving(source, destionation) {
  if (destionation.name === "TableauPile") {
    if (source.name === "FoundationPile") {
      return -15;
    }
    return 5;
  }
  if (destionation.name === "FoundationPile") {
    if (source.name === "TableauPile" || source.name === "WastePile") {
      return 10;
    }
  }
}


if (module.hot) {

  module.hot.accept(console.log.bind(console));

  const doc = angular.element(document);
  const injector = doc.injector();
  if (injector) {
    const actualService = Object.getPrototypeOf(injector.get("scoring"));
    const newScoringService = Object.getPrototypeOf(new Scoring());
    // note: just replaces functions
    Object.getOwnPropertyNames(actualService)
      .filter(key => typeof actualService[key] === "function")
      .forEach(key => actualService[key] = newScoringService[key]);
    console.log(actualService)
    doc.find('html').scope().$apply();
    console.info('[scoring] Hot Swapped!!');
  }
}

angular.module("klondike.scoring", [])
  .factory("scoring", () => new Scoring());
