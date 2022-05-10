import {createMap, forMember, mapFrom} from "@automapper/core";
import {mapper} from "../mappings/mapper";
import {Repos} from "../models/Repos/Repos.entity";
import {ListReposDto} from "../models/Repos/Repos.dto";

export const repoDataMapper = (reposData: Repos[]) => {
    createMap(mapper,
        Repos,
        ListReposDto,
        forMember((destination) => destination.repoName,
            mapFrom((source) => source.name),
        ));

    const reposDto: ListReposDto[] = [];


    reposData.forEach(function (value: Repos) {

        const dtoList = mapper.map(value, Repos, ListReposDto);

        reposDto.push(dtoList)

    });

    return reposDto
}


