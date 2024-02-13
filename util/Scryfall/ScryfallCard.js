/** Scryfall/ScryfallCard
 * 
 * @author Alex Malotky
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//Card Object Constants
const IMAGE_TYPE = "normal";
const POWER = 'power';
const TOUGHNESS = 'toughness';
const LOYALTY = 'loyalty';
const MULTIPLE_FACES = 'card_faces';

/** Scryfall Card Object Converter
 * 
 */
class ScryfallCard {

    /** Constructor
     * 
     * @param {Object} scryfall 
     */
    constructor(scryfall) {
        this.scryfall = scryfall;
    }

    /** Get Name
     * 
     * @returns {string}
     */
    getName() {
        return this.scryfall.name;
    }

    /** Get Mana Cost
     * 
     * @returns {string}
     */
    getManaCost() {
        return this.scryfall.mana_cost;
    }

    /** Get Mana Value
     * 
     * @returns {string}
     */
    getManaValue() {
        return Number(this.scryfall.cmc);
    }

    /** Get Type Line
     * 
     * @returns {string}
     */
    getTypeLine() {
        return this.scryfall.type_line;
    }

    /** Parse Card Face for Oracle Text
     * 
     * @param {Object} card 
     * @returns {string}
     */
    static parseOracleText(cardFace) {
        let output = cardFace.oracle_text;
        if (Object.prototype.hasOwnProperty.call(cardFace, POWER) && Object.prototype.hasOwnProperty.call(cardFace, TOUGHNESS)) {
            output += "\n\n" + cardFace[POWER] + "/" + cardFace[TOUGHNESS];
        }
        else if (Object.prototype.hasOwnProperty.call(cardFace, LOYALTY)) {
            output += "\n\n<" + cardFace[LOYALTY] + ">";
        }
        return output;
    }

    /** Get Oracle Text
     * 
     * @returns {string}
     */
    getOracleText() {
        if (Object.prototype.hasOwnProperty.call(this.scryfall, MULTIPLE_FACES)) {
            return ScryfallCard.parseOracleText(this.scryfall[MULTIPLE_FACES][0])
                + "\n----------\n" + ScryfallCard.parseOracleText(this.scryfall[MULTIPLE_FACES][1]);
        }
        else {
            return ScryfallCard.parseOracleText(this.scryfall);
        }
    }

    /** Parse for Set/Language/and Collector Number
     * 
     * @returns {string}
     */
    parseSet() {
        let output = this.scryfall.set;
        if (this.scryfall.lang !== "en")
            output += "-" + this.scryfall.lang;
        output += ":" + this.scryfall.collector_number;
        return output;
    }

    /** Parse For Images
     * 
     * @returns {Array<string>}
     */
    parseImages() {
        try {
            if (Object.prototype.hasOwnProperty.call(this.scryfall, MULTIPLE_FACES) && this.scryfall[MULTIPLE_FACES][0].image_uris) {
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

    /** Get Art Crop Image
     * 
     * @returns 
     */
    getArtCrop(){
        try {
            if (Object.prototype.hasOwnProperty.call(this.scryfall, MULTIPLE_FACES) && this.scryfall[MULTIPLE_FACES][0].image_uris) {
                return this.scryfall[MULTIPLE_FACES][0].image_uris.art_crop;
            }
            return this.scryfall.image_uris.art_crop;
        } catch (error){
            return "";
        }
    }

    /** Get Image URI List
     * 
     * @returns {Object}
     */
    getImageUriList() {
        let output = {};
        output[this.parseSet()] = this.parseImages();
        return output;
    }

    /** To String
     * 
     * Will return "delete" if it is an art card/has no faces.
     * 
     * @returns {string}
     */
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
