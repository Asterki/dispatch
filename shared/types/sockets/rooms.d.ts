export interface RoomsPrivateJoinData {
  contactID: string;
}
export interface RoomsPrivateJoinResponse {
  roomName: string;
  status: 'joined' | 'blocked' | 'error';
}

export interface RoomsPrivateLeaveData {
  contactID: string;
}
export interface RoomsPrivateLeaveResponse {
  roomName: string;
  status: 'left' | 'error';
}
