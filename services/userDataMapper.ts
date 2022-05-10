import {createMap, forMember, mapFrom} from "@automapper/core";
import {mapper} from "../mappings/mapper";
import {User} from "../models/User/User.entity";
import {UserDto} from "../models/User/User.dto";


export const userDataMapper = (userData: User) => {
    createMap(mapper,
        User,
        UserDto,
        forMember(
            (destination) => destination.username,
            mapFrom((source) => source.login),
        ),
        forMember(
            (destination) => destination.profileImage,
            mapFrom((source) => source.avatar_url),
        ));
    return mapper.map(userData, User, UserDto);
}
