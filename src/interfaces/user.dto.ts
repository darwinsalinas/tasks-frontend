export interface UserDto {
    id: string;
    fullName: string;
    email: string;
}

export type UsersResponse = UserDto[];