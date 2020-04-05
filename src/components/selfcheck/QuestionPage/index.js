import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Question } from '../Question';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root:{
        marginLeft: 20,
        marginRight: 20,
        background: 'white',
        borderRadius: 20,
        height: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        padding: 20,
        ['@media(max-width: 500px)']:{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0
        }
    },
    hide:{
        display: 'none'
    },
    pageTitle:{
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 10
    },
    pageDescription:{
        fontSize: 14,
        color: '#313131',
        marginBottom: 10
    },
    navigation:{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20
    }
})

export function QuestionPage(props){
    const classes = useStyles();

    const { index, show, pageOutOf, page, setScore, changePage } = props;

    const rootClasses = show ? classes.root : classes.hide;

    const [qScore, setQScore] = useState([]);


    const setQuestionScore = (qIndex, qS) => {
        qScore[qIndex]= qS
        setQScore(qScore);
    }

    const saveAndChangePage = (newIndex) => {
        setScore(qScore.reduce((acc, s) => acc + s, 0))
        changePage(newIndex)
    }

    
    
    return(
        <div className={rootClasses}>
            <div className={classes.pageTitle}>
                {page.title}
            </div>
            <div className={classes.pageDescription}>
                {page.descriptions}
            </div>
            {
                page.questions.map((question,i) => {
                    return (<Question key={i} index={i} question={question} setScore={(score)=>setQuestionScore(i, score)}/>)
                })
            }
            <div className={classes.navigation}>
                <Button variant="contained" onClick={()=>saveAndChangePage(index-1)}>
                    {"上一頁"}
                </Button>
                <Button variant="contained" color="secondary" onClick={()=>saveAndChangePage(index+1)}>
                    {index+1 < pageOutOf ? "下一頁" : "完成"}
                </Button>
            </div>
        </div>)
}