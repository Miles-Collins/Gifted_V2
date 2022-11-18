import { appState } from "../AppState.js";
import { Gift } from "../Models/Gift.js";
import { giftsService } from "../Services/GiftsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawGift() {
  let template = "";
  let gifts = appState.gifts;
  // @ts-ignore
  gifts.forEach((gift) => (template += Gift.GiftTemplate(gift)));
  setHTML("gifts", template);
}

export class GiftsController {
  constructor() {
    this.getGifts();
    appState.on("gifts", _drawGift);
    setInterval(this.getGifts, 500);
  }

  async getGifts() {
    try {
      await giftsService.getGifts();
    } catch (error) {
      console.error(error);
      // @ts-ignore
      Pop.error("[ERROR]", error.message);
    }
  }

  async createGift() {
    try {
      window.event.preventDefault();
      const form = window.event.target;
      let giftData = getFormData(form);
      Pop.success("Created gift");
      form.reset();
      console.log(giftData);
      debugger;
      await giftsService.createGift(giftData);
    } catch (error) {
      console.error(error);
      // @ts-ignore
      Pop.error("[ERROR]", error.message);
    }
  }

  async openGift(giftId, giftData) {
    try {
      await giftsService.openGift(giftId, giftData);
    } catch (error) {
      console.error(error);
      // @ts-ignore
      Pop.error("[ERROR]", error.message);
    }
  }

  async deleteGift(giftId) {
    try {
      await giftsService.deleteGift(giftId);
    } catch (error) {
      console.error(error);
      // @ts-ignore
      Pop.error("[ERROR]", error.message);
    }
  }
}
