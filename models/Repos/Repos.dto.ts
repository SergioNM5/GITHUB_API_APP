import {AutoMap} from "@automapper/classes";

export class ListReposDto {

    @AutoMap()
    repoName: string;

    @AutoMap()
    language: string;

    @AutoMap()
    visibility: string;

}
