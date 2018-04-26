# aab-intl
a@b framework - Internationalization

## Locales
### NodeJS use
	const { Locales } = require("aab-intl"),
		  locales = new Locales("./locales"),
		  terms = locales.get("fr-CA", "welcomepage");

### Define locales
#### root directory
This directory should contain json translation files or custom settings into **map.json** and **keymap.json** files explain below.

#### translation files
Translation file name is the name of locale ***( ie: fr-FR.json )*** and should contain an object having at least 3 levels: ui key, term and translation value. All other levels will be flatten with dots into term ***( ie: title.long )*** .

As translation files are imported with **require()** command, so you can split them into folders if you define an index.

	{
	    "common": {
	        "ok": "Ok",
	        "submit": "Submit"
	    },
	    "main": {
	        "title": "Main title",
	        "info": "Main info"
	    },
	    "welcome": {
	        "title": {
		        "short": "Welcome",
		        "long": "Welcome long title"
	        },
	        "info": "Welcome info"
	    }
	}

#### keymap.json
Tired with repeating **"Submit"** for all ui buttons? this file is for you.

You may define a fake ui in translation files containing submit. This map allows you to map any term to another to avoid translating terms twice.

	{
	    "welcome": {
	        "button": "common.submit"
	    }
	}

#### map.json
You have Brazilian and Portuguese translators and you want a fallback between languages? Here is the solution.

**map.json** is a map for each language defining inheritance between languages.

	{
		"pt": [ "pt-PT", "pt-BR", "en" ],
		"pt-PT": [ "pt", "pt-BR", "en" ],
		"pt-BR": [ "pt", "pt-PT", "en" ],
	}
Language order defines priority.

### Common use
#### locales = new Locales( "./locales" )
In the example above, the root folder is **locales**. When relative, absolute path is based on **process.cwd()**. You can find an example in **test/locales** directory.

#### locales.locales
This property returns a Set of defined locales having a translation file or defined in **map.json** file.

#### locales.get( locale, key )
This methods returns an object of terms defined for ui key.

### further methods & properties
#### locales.keymap
**keymap.json** file computed: terms and mapping are inverted to optimize search.

#### locales.map
Entries from **map.json** file with key language will be added as first argument.


#### locales.terms
Array of terms stored as objects containing:
* locale
* key
* term
* value
* pattern ( key.term )

#### locales.root
Absolute path to locales directory defined on creation.

#### locales.load( locale, key, term, value )
This method adds locales.terms entries.

#### locales.setKeymap( key, term, pattern )
This method edits locales.keymap.

#### locales.setMap( locale, ...locales )
This method edits locales.map.
