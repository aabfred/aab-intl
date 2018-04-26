const
    assert = require("assert"),
    { Locales } = require(".."),
    locale = new Locales("./test/locales"),
    tr = {};

for(const l of ["en","fr"]){
    tr[l] = {};
    for(const k of ["common","main","wizard"])
        tr[l][k] = locale.get(l, k);
}

describe("Locale", () => {
    it("#.map", () => {
        assert.equal( JSON.stringify(locale.map), JSON.stringify({ fr: [ "fr", "en" ] }) );
    });
    it("#.keymap", () => {
        assert.equal( JSON.stringify(locale.keymap), JSON.stringify({ wizard: { "common.submit": "button" } }) );
    });
    it("#.terms = 11", () => {
        assert.equal( locale.terms.length, 11 );
    });
    it("#.locales = 2", () => {
        assert.equal( locale.locales.size, 2 );
    });
    describe("Translations: size", () => {
        it("#common", () => {
            assert.deepStrictEqual( Object.keys(tr.en.common), Object.keys(tr.fr.common) );
        });
        it("#main", () => {
            assert.deepStrictEqual( Object.keys(tr.en.main), Object.keys(tr.fr.main) );
        });
        it("#wizard", () => {
            assert.deepStrictEqual( Object.keys(tr.en.wizard), Object.keys(tr.fr.wizard) );
        });
    });
    describe("Translations: en", () => {
        it("main window.title", () => {
            assert.equal( tr.en.main["window.title"], "" );
        });
        it("main info", () => {
            assert.equal( tr.en.main.info, "Main info" );
        });
        it("main title", () => {
            assert.equal( tr.en.main.title, "Main title" );
        });
        it("wizard button", () => {
            assert.equal( tr.en.wizard.button, "Submit" );
        });
    });
    describe("Translations: fr", () => {
        it("main window.title", () => {
            assert.equal( tr.fr.main["window.title"], "Fenêtre" );
        });
        it("main info", () => {
            assert.equal( tr.fr.main.info, tr.en.main.info );
        });
        it("main title", () => {
            assert.notEqual( tr.fr.main.title, tr.en.main.title );
        });
        it("wizard button", () => {
            assert.equal( tr.fr.wizard.button, "Valider" );
        });
    });
});
