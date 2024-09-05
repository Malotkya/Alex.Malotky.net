export interface Card {
    count: number,
    name: string,
    set: string,
    collector_number: string,
    foil: boolean,
    image?: Array<string>,

    //Possible Data from Scryfall
    sets?: any,
    art?: string,
    manaCost?: string,
    manaValue?: number,
    typeLine?:string,
    oracle?: string
}

export interface Deck {
    commanders: Array<Card>,
    main_deck: Dictionary<Array<Card>>,
    color_identity: Array<string>,
    art: string
}

export interface DeckItem extends Deck {
    id?: string,
    name: string,
    description: string
}