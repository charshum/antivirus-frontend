import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import data from '../../data/self_exam_question_data.js';
import { QuestionPage } from './QuestionPage/index.js';
import { SelfCheckResult } from './SelfCheckResult/index.js';

const useStyles = makeStyles({
    root:{
        paddingTop: 20,
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 20,
        
    }
})

export function SelfCheck(){
    const classes = useStyles();
    const [pageIndex, setPageIndex] = useState(0);
    const [score, setScore] = useState([]);

    console.log(data);

    const setPageScore = (pageIndex, pageScore) => {
        score[pageIndex]= pageScore
        console.log(score);
        setScore(score);
    }
    
    const changePage = (nextId) => {
        setPageIndex(nextId);
    }

    useEffect(()=>{
        console.log(score);
    }, score)

    return(
        <div className={classes.root}>
            {
                data.pages.map((page,i) => {
                    return(
                        <QuestionPage 
                            key={i} 
                            index={i} 
                            pageOutOf={data.pages.length} 
                            page={page} 
                            show={pageIndex == i} 
                            setScore={score=>setPageScore(i, score)}
                            changePage={changePage}/>
                        )
                })
            }
            <SelfCheckResult show={pageIndex >= data.length} score={score}/>
        </div>)
}