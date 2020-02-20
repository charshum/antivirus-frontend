import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 8,
    marginTop: 0,
    minWidth: 250,
    maxWidth: 250,
    background: '#ffffff',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root:{
      padding: 2,
      borderRadius: 10,
      background: '#ffffff',
      margin: 10,
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',

  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
      zIndex: 10000000
    },
  },
};


function SearchOverlay(props){
    const { data, updateFilter, values } = props;
    const [list, setList] = React.useState(values);

    useEffect(() => { setList(values) }, [values])

    const handleChange = event => {
        setList(event.target.value);
        updateFilter(event.target.value);
    };
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.label} id={`${props.id}-label`}>{props.name}</InputLabel>
                <Select
                    className={classes.select}
                    labelId={`${props.id}-label`}
                    id={props.id}
                    multiple
                    value={list}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={
                        selected => (
                        selected.map(value => (
                            data.find(item=> item.id == value).text
                        )).join(', '))}
                    MenuProps={MenuProps}
                    >
                    {data.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                            <Checkbox checked={list.indexOf(item.id) > -1} />
                            <ListItemText primary={item.text} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>             
        </div>

    )
}


export default SearchOverlay;
