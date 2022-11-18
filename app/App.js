import { GiftsController } from "./Controllers/GiftsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();
  giftsController = new GiftsController();
}

window["app"] = new App();
