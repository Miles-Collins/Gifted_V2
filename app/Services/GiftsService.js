import { appState } from "../AppState.js";
import { Gift } from "../Models/Gift.js";
import { Pop } from "../Utils/Pop.js";
import { api } from "./AxiosService.js";

class GiftsService {
  async deleteGift(giftId) {
    const res = await api.delete("/gifts/" + giftId);
    Pop.success("Deleted Gift");
    appState.gifts = appState.gifts.filter((gift) => gift.id != giftId);
  }
  async createGift(giftData) {
    const res = await api.post("/gifts", giftData);
    console.log("Created Gift", res.data);
    let gifts = appState.gifts.map((gift) => new Gift(gift));
    console.log(gifts);
  }
  async getById(giftId) {
    let gift = await api.get(`gifts/${giftId}`);
    // console.log("Gift by Id", gift);
    let newGift = new Gift(gift.data);
    return newGift;
  }

  async openGift(giftId, giftData) {
    let gift = await this.getById(giftId);

    if (gift.opened == false) {
      console.log("PreEdited Gift", gift);
      gift.opened = !gift.opened;
      const res = await api.put(`gifts/${giftId}`, gift);
      appState.emit("gifts");
    } else {
      return Pop.error("This gift has already been opened.");
    }
    appState.emit("gifts");
  }
  async getGifts() {
    const res = await api.get("/gifts");
    // console.log("Gift data", res.data);
    appState.gifts = res.data.map((gift) => new Gift(gift));
    console.log("Gift Model Gift:", appState.gifts);
  }
}

export const giftsService = new GiftsService();
