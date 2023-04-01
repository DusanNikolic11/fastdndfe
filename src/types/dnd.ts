export interface IPlayer {
  name: string;
  id: string;
  champion: string;
  health: number;
  mana: number;
  bonusForNextRound: number;
}

export interface IRoom {
  conversationId: string;
  link: string;
  player?: IPlayer;
  admin?: IPlayer;
}

export enum MoveTypes {
  FREE_WILL = "free_will",
  DISCOVER_HEALTH = "discover_health",
  DISCOVER_MANA = "discover_mana",
  EXPLORE_WORLD = "explore_world",
  CONVERSATION_WITH_TEAM = "conversation_with_team",
  REST = "rest",
}
