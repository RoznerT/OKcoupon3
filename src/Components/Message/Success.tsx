import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import ErrorModel from "../../Model/MsgModel";
import CloseIcon from '@mui/icons-material/Close';

interface SuccessProps{
    isSuccess:boolean;
    success: ErrorModel | undefined;
    onClickHandle : () => void;
}

function Message(props:SuccessProps): JSX.Element {
  
    return ( 
    <Box sx={{width:"40%" ,height: "80%", position:"fixed" , bottom:"0" , mb:"2%" ,left:0}}>
    <Snackbar open={props.isSuccess} autoHideDuration={5000} onClose={props.onClickHandle}>
    <Alert 
    severity="success"
    action={
        <IconButton
    aria-label="close"
      color="inherit"
      size="medium"
      onClick={props.onClickHandle}
      >
        <CloseIcon fontSize="inherit"/>
      </IconButton>
      
    } sx={{mb:5, width: 800, height: 100, border: 2,
    borderColor: "green", }}>
        <h3>
        Http Status: {props.success?.status} , &nbsp;
        {props.success?.error} &nbsp;
        {props.success?.description}
        </h3>
    </Alert>
    </Snackbar>
    </Box>
     );
}

export default Message;
