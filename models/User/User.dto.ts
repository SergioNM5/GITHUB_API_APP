import { AutoMap } from "@automapper/classes";

export class UserDto {

    @AutoMap()
    username: string;

    @AutoMap()
    name!: string;

    @AutoMap()
    profileImage!: string;

    @AutoMap()
    followers: number;

    @AutoMap()
    following: number;

    @AutoMap()
    email!: string;

}


