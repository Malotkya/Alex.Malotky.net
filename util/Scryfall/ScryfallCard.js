"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMAGE_TYPE = "normal";
class ScryfallCard {
    constructor(scryfall) {
        this.scryfall = scryfall;
    }
    getName() {
        return this.scryfall.name;
    }
    getManaCost() {
        return this.scryfall.mana_cost;
    }
    getManaValue() {
        return Number(this.scryfall.cmc);
    }
    getTypeLine() {
        return this.scryfall.type_line;
    }
    parseOracleText(card) {
        let output = card.oracle_text;
        if (Object.prototype.hasOwnProperty.call(card, 'power') && Object.prototype.hasOwnProperty.call(card, 'toughness')) {
            output += "\n\n" + card.power + "/" + card.toughness;
        }
        else if (Object.prototype.hasOwnProperty.call(card, 'loyalty')) {
            output += "\n\n<" + card.loyalty + ">";
        }
        return output;
    }
    getOracleText() {
        if (Object.prototype.hasOwnProperty.call(this.scryfall, "card_faces")) {
            return this.parseOracleText(this.scryfall.card_faces[0])
                + "\n----------\n" + this.parseOracleText(this.scryfall.card_faces[1]);
        }
        else {
            return this.parseOracleText(this.scryfall);
        }
    }
    parseSet() {
        let output = this.scryfall.set;
        if (this.scryfall.lang !== "en")
            output += "-" + this.scryfall.lang;
        output += ":" + this.scryfall.collector_number;
        return output;
    }
    parseImages() {
        try {
            if (Object.prototype.hasOwnProperty.call(this.scryfall, "card_faces") && this.scryfall.card_faces[0].image_uris) {
                return [
                    this.scryfall.card_faces[0].image_uris[IMAGE_TYPE],
                    this.scryfall.card_faces[1].image_uris[IMAGE_TYPE]
                ];
            }
            return [
                this.scryfall.image_uris[IMAGE_TYPE]
            ];
        }
        catch (error) {
            return [];
        }
    }
    getArtCrop(){
        try {
            if (Object.prototype.hasOwnProperty.call(this.scryfall, "card_faces") && this.scryfall.card_faces[0].image_uris) {
                return this.scryfall.card_faces[0].image_uris.art_crop;
            }
            return this.scryfall.image_uris.art_crop;
        } catch (error){
            return "";
        }
    }
    getImageUriList() {
        let output = {};
        output[this.parseSet()] = this.parseImages();
        return output;
    }
    toString() {
        //Removes Art Cards from list.
        if (this.scryfall.multiverse_ids.length < 1)
            return "delete";
        let output = {
            name: this.getName(),
            manaCost: this.getManaCost(),
            manaValue: this.getManaValue(),
            typeLine: this.getTypeLine(),
            oracle: this.getOracleText(),
            sets: this.getImageUriList(),
            art: this.getArtCrop(),
        };
        return JSON.stringify(output);
    }
}
exports.default = ScryfallCard;
