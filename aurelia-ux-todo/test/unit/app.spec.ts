import {App} from '../../src/app';

class UX {
    public design = {
        primary: '',
        accent: '',
    };
}


describe('the app', () => {
    it('says hello', () => {
        let ux = new UX();
        let sut = new App(ux);
        expect(ux.design.primary).toBe('#009688');
        expect(ux.design.accent).toBe('#4CAF50');
        expect(sut.showNavigationMenu).toBe(false);
    });
});
