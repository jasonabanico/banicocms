import { Injectable } from '@angular/core';

function _window() : any {
    var global: any;
    
    // return the global native browser window object
    if (window !== undefined) {
        return window;
    }
    if (global.window  !== undefined) {
        return global.window;
    }

    return null;
}

@Injectable()
export class WindowRefService {
   get nativeWindow() : any {
      return _window();
   }
}