import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import classes from '../../styles/SearchRepos.module.css'
import SearchBar from "../../components/UI/SearchBar";
import {ListReposDto} from "../../models/Repos/Repos.dto";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";
import {repoDataMapper} from "../../services/repoDataMapper";
import {Repos} from "../../models/Repos/Repos.entity";
import RepoCard from "../../components/RepoCard";


const SearchReposPage = ({session}: { session: Session }) => {

    const [searchText, setSearchText] = useState('');
    const [repos, setRepos] = useState<ListReposDto[]>([])
    const [loading, setLoading] = useState(false)

    const onSearchTextChange = (text: string) => {
        setSearchText(text)
    }

    const onSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true);
        if (!searchText) {
            console.log('You have to write the key word')
        }

        const reposResponse = await fetch(`https://api.github.com/search/repositories?q=${searchText}&sort=stars&order=desc`, {
            headers: {
                authorization: `token ${session?.user.accessToken}`
            }
        })

        const {items}: { items: Repos[] } = await reposResponse.json();
        const reposDto = repoDataMapper(items);

        setRepos(reposDto)
        setLoading(false)
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
                {loading && <p>Loading....</p>}
            </div>

        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getSession(context)


    return {
        props: {
            session
        }
    }
}

export default SearchReposPage;
