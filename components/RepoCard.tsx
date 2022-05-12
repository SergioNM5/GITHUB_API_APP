import React from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import classes from '../styles/RepoCard.module.css'
import {ListReposDto} from "../models/Repos/Repos.dto";

const LANGUAGES = [
    {label: 'C#', color: 'black'},
    {label: 'JavaScript', color: 'yellow'},
    {label: 'Go', color: 'gray'},
    {label: 'PHP', color: 'purple'},
    {label: 'C++', color: 'blue'},
    {label: 'Java', color: 'red'},
    {label: 'Python', color: 'green'},
    {label: 'TypeScript', color: 'orange'},
    {label: 'CSS', color: '#7bb3ff'},
    {label: 'HTML', color: '#e54d4d'}
];

const RepoCard = ({repo}: { repo: ListReposDto }) => {

    const searchCircleColor = () => {
        const language = LANGUAGES.find(language => language.label === repo.language)
        if(language) {
           return language?.color
        } else if (repo.language) {
            return '#d1d1d1'
        }
    }

    return (
        <Card sx={{marginBottom: '20px', minWidth: '313px', borderRadius: '20px'}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Typography sx={{fontSize: 14, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '220px'}}>{repo.repoName}</Typography>
                    <div className={classes.language__container}>
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
