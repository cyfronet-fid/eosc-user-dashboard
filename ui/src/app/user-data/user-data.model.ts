export interface IUserDataResponse {
  user: IUserResponse,
  data: IUserDetailsResponse[]
}

export interface IUserResponse {
  name: string;
}

export interface IUserDetailsResponse {
  id: number,
  [detail_type: string]: string | number
}
