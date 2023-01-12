import { Button, Paper, Typography, List, ListItem } from '@mui/material';
import { theme } from '../theme/theme';
import { useState } from 'react';

export function Fact({ emoji, title, text, listItems }) {
    const [factShowing, setFactShowing] = useState(false);

    function showFact() {
        console.log()
        setFactShowing(!factShowing);
    }
    
    return (
        <Button id="giant-btn" onClick={showFact}>
        <Paper
            elevation={6}
            sx={{ 
                padding: 3, 
                margin: 2,
                minWidth: '150px', 
                color: theme.typography.secondary.color, 
                backgroundColor: theme.palette.primary.main }}>
            <p className='emoji'>{emoji}</p>
            {!factShowing ?
            <Typography variant="h6" sx={{ fontFamily: theme.typography.secondary }}>{title}</Typography>
            :
            <Typography variant="h6" sx={{ fontFamily: theme.typography.secondary }}>{text}
                {listItems ? <List>{listItems.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</List> : null}
            </Typography>                
            }            
        </Paper>
    </Button> 
    )  
}