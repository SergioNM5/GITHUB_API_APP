import React from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import classes from '../styles/RepoCard.module.css'
import {ListReposDto} from "../models/Repos/Repos.dto";

const LANGUAGES = [
    { value: 'csharp#', label: 'C#', color: 'black' },
    { value: 'javascript', label: 'JavaScript', color: 'yellow' },
    { value: 'go', label: 'Go', color: 'gray' },
    { value: 'php', label: 'PHP', color: 'purple' },
    { value: 'cpp', label: 'C++', color: 'blue' },
    { value: 'java', label: 'Java', color: 'red' },
    { value: 'python', label: 'Python', color: 'green' },
    { value: 'typescript', label: 'TypeScript', color: 'orange' },
    {value: 'css', label: 'CSS', color: '#7bb3ff'}
];

const RepoCard = ({repo}:{ repo: ListReposDto}) => {

    const searchCircleColor = () => {
        const language = LANGUAGES.find(language => language.label === repo.language)
        return language?.color
    }

    return (
        <Card sx={{marginBottom: '20px', minWidth: '313px'}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Typography sx={{fontSize: 14}}>{repo.repoName}</Typography>
                    <div className={classes.language__container} >
                        <div className={classes.language__circle} style={{backgroundColor: searchCircleColor()}}/>
                        <Typography sx={{fontSize: 12}}>{repo.language}</Typography>
                    </div>
                </div>
                <div>
                    {repo.visibility === 'private' ? <Typography sx={{fontSize: 12}}>Private</Typography> :
                        <Typography sx={{fontSize: 12}}>Public</Typography>}
                </div>
            </CardContent>
        </Card>
    );
};

export default RepoCard;
