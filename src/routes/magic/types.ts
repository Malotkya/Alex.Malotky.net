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