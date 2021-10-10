export interface IPlayer {
    id: string,
    
}

export interface IRoom {
    code: string,
    players: IPlayer[]
}