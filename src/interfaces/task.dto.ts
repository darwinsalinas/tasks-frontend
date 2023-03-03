import { UserDto } from "./user.dto";

export interface TaskDto {
    id: string;
    title: string;
    description: string;
    status: string;
    user: UserDto;
}