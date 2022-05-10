import { AutoMap } from "@automapper/classes";

export class User {

    @AutoMap()
    login: string;

    @AutoMap()
    id: number;

    @AutoMap()
    node_id!: string;

    @AutoMap()
    avatar_url!: string;

    @AutoMap()
    gravatar_id!: string;

    @AutoMap()
    url!: string;

    @AutoMap()
    html_url!: string;

    @AutoMap()
    followers_url!: string;

    @AutoMap()
    following_url!: string;

    @AutoMap()
    gists_url!: string;

    @AutoMap()
    starred_url!: string;

    @AutoMap()
    subscriptions_url!: string;

    @AutoMap()
    organizations_url!: string;

    @AutoMap()
    repos_url!: string;

    @AutoMap()
    events_url!: string;

    @AutoMap()
    received_events_url!: string;

    @AutoMap()
    type!: string;

    @AutoMap()
    site_admin!: boolean;

    @AutoMap()
    name!: string;

    @AutoMap()
    company!: string;

    @AutoMap()
    blog!: string;

    @AutoMap()
    location!: string;

    @AutoMap()
    email!: string;

    @AutoMap()
    hireable!: string;

    @AutoMap()
    bio!: string;

    @AutoMap()
    twitter_username!: string;

    @AutoMap()
    public_repos: number;

    @AutoMap()
    public_gists: number;

    @AutoMap()
    followers: number;

    @AutoMap()
    following: number;

    @AutoMap()
    created_at: Date;

    @AutoMap()
    updated_at!: Date;

}



