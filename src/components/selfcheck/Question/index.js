import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles({
    root:{
        marginTop: 30
    },
    hide:{
        display: 'none'
    },
    title:{
    
    },
    option:{

    }
    ,
    multiOptions:{
        display: 'flex',
        flexDirection: 'column'
    }
})

function SingleChoiceOptions(props){
    const { options, updateScore, index } = props;
    const classes = useStyles();

    const [value, setValue] = useState(-1);

    const handleChange = (event) => {
        let value = event.target.value;
        console.log("change "+value);
        let score = options[value].score;
        setValue(value);
        updateScore(score);
    }

    useEffect(()=>{
        console.log(value);
    }, [value])

    return(
        <FormControl component="fieldset">
            <RadioGroup 
                aria-label={'q'+index} 
                name={'q'+index} 
                value={value} 
                onChange={handleChange}>
            {                
                options.map((option, index) => {
                    return(
                        <FormControlLabel 
                            key={'i'+index} 
                            value={""+index} 
                            control={<Radio />} 
                            label={option.value} />
                    )
                })                
            }
            </RadioGroup>
        </FormControl>
    )
}

function MultipleChoiceOptions(props){
    const { options, updateScore } = props;
    const classes = useStyles();

    const [checked, setChecked] = useState([]);

    const handleChange = (e, i) => {
        checked[i] = e.target.checked;
        setChecked(checked);
        if(e.target.checked){
            updateScore(options[i].score);
        }else{
            updateScore(-options[i].score);
        }
    }

    return(
        <div className={classes.multiOptions}>
            {
                options.map((option,i) => {
                    return(
                        <FormControlLabel
                            control={<Checkbox checked={checked[i] || false} 
                            onChange={(e)=>handleChange(e,i)} name={"m"+i} />}
                            label={option.value}
                        />
                    )
                })
            }         
        </div>

    )
}

export function Question(props){
    const classes = useStyles();

    const { index, question, setScore } = props;

    const [score, setScoreState] = useState(0);

    let questionId = index + 1;

    useEffect(()=>{
        setScore(score);
    }, [score])

    const accScore = (scoreChange) => {
        setScoreState(score + scoreChange)
    }

    const setLocalScore = (s) => {
        setScoreState(s)
    }
    

    useEffect(()=>{
        console.log(score);
    }, [score])

    return(
        <div className={classes.root}>
            <div className={classes.title}>
                {questionId+". "+question.title}
            </div>
            {
                question.choice == 1 ? 
                <SingleChoiceOptions index={index} options={question.options} updateScore={setLocalScore}/>:
                <MultipleChoiceOptions index={index} options={question.options} updateScore={accScore}/>
            }

        </div>)
}