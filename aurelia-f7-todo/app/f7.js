import 'framework7';


class F7Handler {
    constructor() {
        this.f7 = new Framework7();
    }

    get(target, name) {
        console.log(target, name)
        return target[name];
    }
}

let handler = {
    get: (target, name) => {
        return target.f7[name];
    }
};


export const F7 = new Proxy(new F7Handler(), handler);
