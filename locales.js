const
    { join, resolve: pres } = require("path"),
    { readdirSync: ls } = require("fs"),
    CWD = process.cwd();

class Locales {

    constructor( path ){
        this.root = path = pres( CWD, path );
        this.map = Object.create( null );
        this.keymap = Object.create( null );
        this.locales = new Set();
        this.terms = [];
        for( const file of ls( path ) ){
            const
                key = file.replace( /\.json$/, "" ),
                value = require( join( path, file ) );
            if( key == "map" )
                this.setMap( value );
            else if( key == "keymap" )
                this.setKeymap( value );
            else
                this.load( key, value );
        }
    }

    load( locale, key, term, value ){
        if( typeof key == "object" )
            return Object.entries( key ).map( ([k,v]) => this.load( locale, k, v ) );
        if( typeof term == "object" )
            return Object.entries( term ).map( ([k,v]) => this.load( locale, key, k, v ) );
        if( typeof value == "object" )
            return Object.entries( value ).map( ([k,v]) => this.load( locale, key, term + "." + k, v ) );
        this.locales.add( locale );
        this.terms.push( { locale, key, term, value, pattern: key + "." + term } );
    }
    setMap( locale, ...locales ){
        if( typeof locale == "object" )
            return Object.entries( locale ).map( ([k,v]) => this.setMap( k, ...v ) );
        this.locales.add( locale );
        this.map[ locale ] = [ locale ].concat( locales );
    }
    setKeymap( key, term, pattern ){
        if( typeof key == "object" )
            return Object.entries( key ).map( ([k,v]) => this.setKeymap( k, v ) );
        if( typeof term == "object" )
            return Object.entries( term ).map( ([k,v]) => this.setKeymap( key, k, v ) );
        if( typeof pattern == "object" )
            return Object.entries( pattern ).map( ([k,v]) => this.setKeymap( key, term + "." + k, v ) );
        if( !( key in this.keymap ) ) this.keymap[key] = Object.create(null);
        this.keymap[key][ pattern ] = term;
    }

    get( slocale, skey ){
        const
            found = Object.create(null),
            terms = Object.create(null),
            locales = this.map[ slocale ] || [ slocale ],
            keymap = this.keymap[ skey ] || {};
        for( let { locale, key, term, value, pattern } of this.terms ){
            if( pattern in keymap )
                term = keymap[ pattern ];
            else if( key !== skey ) continue;
            const index = locales.indexOf( locale );
            if( index == -1 ){
                if( !( term in terms ) ) terms[ term ] = "";
                continue;
            }
            if( ( term in found ) && ( found[term] < index ) ) continue;
            found[ term ] = index;
            terms[ term ] = value;
        }
        return terms;
    }

}

module.exports = Locales;
