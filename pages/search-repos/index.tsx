import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import classes from '../../styles/SearchRepos.module.css'
import SearchBar from "../../components/UI/SearchBar";
import {ListReposDto} from "../../models/Repos/Repos.dto";
import {useSession} from "next-auth/react";
import {repoDataMapper} from "../../services/repoDataMapper";
import {Repos} from "../../models/Repos/Repos.entity";
import RepoCard from "../../components/RepoCard";


const SearchReposPage = () => {

    const [searchText, setSearchText] = useState('');
    const [repos, setRepos] = useState<ListReposDto[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {data: session} = useSession()

    const onSearchTextChange = (text: string) => {
        setSearchText(text)
    }

    const onSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {

        setRepos([])
        setError(null)

        if (!searchText || searchText.length < 3) {
            setError('You have to write a key word with more than 2 characters and the field cant be empty')
        } else {
            try {
                setIsLoading(true);
                const reposResponse = await fetch(`https://api.github.com/search/repositories?q=${searchText}&sort=stars&order=desc`, {
                    headers: {
                        authorization: `token ${session?.user.accessToken}`
                    }
                })
                if(!reposResponse.ok) {
                    throw new Error('Something went wrong');
                }
                const {items}: { items: Repos[] } = await reposResponse.json();
                if(items.length === 0) {
                    throw new Error('No repositories found')
                }
                const reposDto = repoDataMapper(items);

                setRepos(reposDto)
                setSearchText('');
                console.log(searchText)
            } catch (error: any) {
                setError(error.message)
            }
            setIsLoading(false)
        }

    }

    return (
        <Layout>
            <div className={classes.search_repos__container}>
                <h2 className={classes.title}>Search <span>Repositories</span></h2>
                <SearchBar onChange={onSearchTextChange} onClick={onSearch}/>
                {repos.length !== 0 && (
                    <div className={classes.repositories__container}>
                        <p>Results</p>
                        <div className={classes.repositories__list}>
                            {
                                repos.map(repo => {
                                    return (
                                        <RepoCard key={repo.repoName} repo={repo}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                )}
                {isLoading && <p>Loading....</p>}
                {error && <p>{error}</p>}
            </div>

        </Layout>
    );
};


export default SearchReposPage;
