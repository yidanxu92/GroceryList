import React, {useEffect, useState} from 'react';
import  './index.css'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from  '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationDialog from '../ConfirmationDialog/index.js';
import { confirmDialog } from '../ConfirmationDialog/index.js';
import {getWithExpiry, setWithExpiry} from './../../stateStorageWithTTL';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '70%',
        margin: 'auto',
        marginTop: 20
    }
}));


const DataOutput =({mainStructure,userInput,arrayOfUnits,open,addToArray,
                       editArray,deleteArray,checkObjectInLocal,handleFormClose})=> {

    console.log("This is DataOutput");
    console.log("userInput is",userInput);
    console.log("mainStructure is ",mainStructure);
    console.log("mainStructure[userInput] is ",mainStructure[userInput]);
    console.log("DataOutput:check localStorage for lastOpen: ",getWithExpiry());
    console.log("DataOutput: check localStorage for userInput: ",JSON.parse(localStorage.getItem(userInput))||null);


    /* every time there is a change in mainstructure, this fucntion will be called and save the change to localStorage*/
    useEffect(()=>{console.log("userEffect for mainStructure has been called!");
        console.log("some changes must have happened to mainStructure!")
        console.log ("current localInput is ",userInput);
        console.log("current mainStructure is ",mainStructure);
        console.log("current mainStructure[userInput] is ",mainStructure[userInput]);
        if (userInput !== '' && mainStructure)
        {
            console.log("last open is being set here!");
            setWithExpiry('lastOpen',mainStructure,60000)
            console.log("local storage is being stored here!")
            localStorage.setItem(userInput,JSON.stringify(mainStructure[userInput]))
          /*  localStorage.setItem(userInput,JSON.stringify(mainStructure));*/
        }

    },[mainStructure])

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogOpen = () =>{
        setIsDialogOpen(!isDialogOpen);
    }


    const [saveFile, setSaveFile] = useState(false);
    const handleSave = () => {
        setSaveFile(!saveFile);
        if(saveFile){
            console.log("saveFile is being called!")
            console.log("we will store the current mainStructure to localStorage")
            localStorage.setItem(userInput,JSON.stringify(mainStructure[userInput]))
            console.log("we will also store ")
            setWithExpiry(userInput,mainStructure,60000);
            console.log("check localStorage: ",JSON.parse(localStorage.getItem(userInput)));
        }
    }


    /*convert arrayOfUnits to object, because lookup only accepts object.*/
    /*let  newArrayOfUnits= Object.assign({},arrayOfUnits);*/

    /*This line of code convert an array to an object then  to {a:a...}*/
    let newArrayOfUnits = arrayOfUnits.reduce((a, v) => ({ ...a, [v]: v}), {});

    /* let newArrayOfUnits = arrayOfUnits.map(unit => {
         return {[unit]: unit}
     })*/


    const defaultMaterialTheme = createTheme();
    const classes = useStyles();

    const [columns, setColumns] = useState([
        { title: 'Ingredient', field: 'ingredient',validate :rowData => {
            if(rowData.ingredient === undefined || rowData.ingredient===""){
                return "Requried";
            }
            else if (!/^[a-zA-Z]+$/.test( rowData.ingredient))
            {
                return "Only characters allowed"
            }
            return true;
            }

        },

                /*/^\d+$/.test( rowData.ingredient) ? 'ingredient can only contain characters!':'' },*/
        { title: 'Amount', field: 'amount' ,validate :rowData =>{
            if(rowData.amount === undefined || rowData.amount===""){
                return "Required"
            }
            else if (!/^[1-9]\d*$/.test( rowData.amount))
            {
                return "Enter valid number"
            }
            return true
            } },

/*/^[1-9]\d*$/.test( rowData.amount) ? '':'amount must be a valid number!'},*/
        { title: 'Unit', field: 'unit',lookup:newArrayOfUnits,validate :rowData =>{
                if(rowData.amount === undefined || rowData.amount===""){
                    return "Required"
                }
                return true}},

    ]);

   /* const [actions, setActions] = useState([
        { icon: 'create', tooltip: 'Edit', onClick: (event, rowData) => alert('Edit ' + rowData.name + '?')}},
        { icon: 'delete', tooltip: 'Delete', onClick: (event, rowData) => alert('Delete ' + rowData.name + '?')}
    ])*/

    let actions = [
        {icon: () => saveFile ? <LockIcon/>:<LockOpenIcon/>,
            tooltip:  saveFile ? 'Unlock Edit':'Save File',
            position:"toolbar",
            isFreeAction:true,
            onClick: () => {
            handleSave();
            }},

        {
            icon: ()=><DeleteIcon/>,
            tooltip: 'Delete This Recipe',
            position:"toolbar",
           /* onClick: () => {setIsDialogOpen(true);}*/
            onClick: () => {
                console.log("The delete button is being clicked!");
                handleDialogOpen();
                confirmDialog('Confirm Deletion','Do you really want to delete the recipe?', () => {
                    delete mainStructure[userInput];
                    if (userInput in localStorage) {
                        localStorage.removeItem(userInput);
                    }

                    handleFormClose();}
                );
            }


        },

        {
            icon: ()=><CloseIcon/>,
            tooltip: 'Close This Recipe',
            position:"toolbar",
            onClick : () => {
                handleFormClose();
            }
        }

    ]


    const [options, setOptions] = useState({
        headerStyle: { color: 'rgba(0, 0, 0, 0.54)' },
        actionsColumnIndex: -1,
        paging: true,
        pageSize: 10,
        pageSizeOptions: [],
        paginationType: 'normal'});

  /*  const[d,setD] = useState(Boolean(userInput) ? (userInput in localStorage ? JSON.parse(localStorage.getItem(userInput))
        :mainStructure[userInput]) : []);

    console.log("data used in DataOutput :",d);8?*/







    return (
          <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

              <Fade in={open} style={{ transitionDelay: open ? '300ms' : '0ms' }}>
              < div className={classes.root}>
                  <MaterialTable title={userInput}
                                 options={options}
                                 columns={columns}
                                 data={mainStructure[userInput]}
                                 actions={actions}

                                 editable={{
                                     isDeletable:(row)=> saveFile===false,
                                     isEditable:row=>saveFile===false,
                                     onRowAdd: saveFile ? undefined : (newData) =>
                                         new Promise((resolve, reject) => {
                                             console.log("inside onRowAdd. userInput is ", userInput);
                                             console.log("ingredient is ", newData.ingredient);
                                             console.log("amount is ", newData.amount);

                                             if (/^[a-zA-Z]+$/.test(newData.ingredient) && /^[1-9]\d*$/.test(newData.amount)) {
                                                 setTimeout(() => {
                                                     addToArray(newData);
                                                     resolve();
                                                 }, 1000)
                                             } else {
                                                 alert("Invalid Input! Please go back and check your input information!");
                                                 reject();
                                             }

                                             console.log("from editable, mainStructure[userInput] after add : ", mainStructure[userInput]);
                                             console.log("newData is ", newData);

                                         }),
                                     onRowUpdate: (newData, oldData) =>
                                     new Promise((resolve, reject) => {
                                         setTimeout(() => {
                                             editArray(oldData,newData);

                                             resolve();}, 1000)
                                     }),
                                     onRowDelete: (oldData) =>
                                     new Promise((resolve, reject) => {
                                         setTimeout(() => {
                                             deleteArray(oldData);
                                             resolve();
                                         }, 1000);
                                     })
                                                  }}>


                  </MaterialTable>
                  {isDialogOpen &&  <ConfirmationDialog />}



              </div>
              </Fade>

            </>
    );
}

/*{isDialogOpen &&  <ConfirmationDialog />}*/

    /*saveFile ? undefined:*/


/*   <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <ThemeProvider theme={defaultMaterialTheme}>*/



        /*
        <div
            className="recipeColumn"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >

            <div className="titleSection">
                <h2>{userInput}</h2>

            </div>
            <div className = "contentSection">
                {mainStructure[userInput] && mainStructure[userInput].map((item,index)=>{
                    let keyName = userInput+index;
                    console.log("current item is ",item);
                    console.log("current index is ",index);
                    return(
                        <div key={keyName} className="item-div" style={{background: "#d8caaf"}}>
                            <ContentEditable html={item['ingredient']} className="item-ingredient"
                                             onChange = {(e) => editArray(e,item['ingredient'],index)}></ContentEditable>
                            <ContentEditable html={item['amount']} className="item-amount"
                                             onChange = {(e) => editArray(e,item['amount'],index)}></ContentEditable>
                            <select className="item-unit" onChange = {(e) => editArray(e,item['unit'],index)}>
                                <option key={item['unit']}>{item['unit']}</option>
                                {
                                    arrayOfUnits.map((option) =>{
                                        if(option !== item['unit'])
                                        {
                                            return <option key={option} value={option}>{option}</option>
                                        }

                                    })}
                                </select>

                            <span className="recipe-delete-button" onClick={() => deleteArray(item['ingredient'])}>x</span>


                        </div>
                        )



                })
                }
            </div>

        </div>*/

/*  <Fade in={open}
                      style={{ transitionDelay: open ? '300ms' : '0ms' }}
                >*/


export default DataOutput;
