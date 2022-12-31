import { Paper, Typography } from "@mui/material";
import { theme } from "../theme/theme";

export function Badge({ animalName, url }) {
    return (
        
        <Paper 
        elevation={18} 
        sx={{ 
            borderRadius: '50%', 
            height: 200, 
            width: 320, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: 2 }}>
                <Typography 
                    variant="h6" 
                    fontFamily={theme.typography.primary}>{animalName}
                    
                </Typography>
                <img 
                    src={url} 
                    alt={animalName}
                    style={{ maxWidth: 150, maxHeight: 130 }}/>        
        </Paper>
         
    )
}