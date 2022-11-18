import { generateId } from "../Utils/generateId.js";

export class Gift {
  constructor(data) {
    this.created = data.createdAt;
    this.id = data.id || generateId();
    this.opened = data.opened || false;
    this.tag = data.tag;
    this.updated = data.updatedAt;
    this.url = data.url;
  }

  static GiftTemplate(gift) {
    if (gift.opened == true) {
      return /*html*/ `
    <div class="col-5 col-md-3 bg-dark p-3 m-1 selectable rounded">
      <h3 class="text-light text-end closePosition"><i onclick="app.giftsController.deleteGift('${gift.id}')" class="mdi mdi-delete-forever"></i></h3>
      <img onclick="app.giftsController.openGift('${gift.id}')" class="giftSize rounded" src="${gift.url}" alt="gift">
      <p class="p-0 m-0 text-light text-center">${gift.tag}</p>
    </div>
    `;
    } else if (gift.opened == false) {
      return /*html*/ `
      <div class="col-5 col-md-3 bg-dark p-3 m-1">
        <img onclick="app.giftsController.openGift('${gift.id}')" class="giftSize" src="https://cdn.bmstores.co.uk/images/hpcProductImage/imgFull/298031-licensed-rollwrap-pokemon.jpg" alt="gift">
        <p class="p-0 m-0 text-light text-center">${gift.tag}</p>
      </div>
      `;
    }
  }
}
