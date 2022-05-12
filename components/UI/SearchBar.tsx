import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {Button} from "@mui/material";
import classes from '../../styles/SearchBar.module.css'


type Props = {
    onChange: (e: string) => void;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
}

const SearchBar:React.FC<Props> = ({onChange, onClick}) => {

    const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }

    const onClickSearchButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick(e)
    }

    return (
        <div className={classes.search__section}>
            <div className={classes.search_field}>
                <SearchIcon/>
                <input type='text' placeholder='Search...' onChange={onSearchBarChange}/>
            </div>
            <Button variant={'contained'} disableElevation onClick={onClickSearchButton}>Search</Button>
        </div>
    );
};

export default SearchBar;
