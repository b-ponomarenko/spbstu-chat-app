import "./polyfills.ts";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {environment} from "./environments/environment";
import {AppModule} from "./app/";

//TODO: Сделать обработку ошибок
//TODO: Попробовать добавить фичу "Сейчас онлайн"
//TODO: Попробовать отображать данные по сообщениям в списке диалогов
//TODO: Сделать инпут создания диалога в виде появляющейся секции

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
