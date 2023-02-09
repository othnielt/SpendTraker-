import React from 'react';
import {Card,From, ProgressBar,Stack,Button} from 'react-bootstrap';
import {currencyFormat} from '../Utils';




export  function BudgetCard({

    name,
    amount,
    max,
    gray,
    hideButton,
    AddExpenseButton,
    VeiwExpensesButton

}) {


    /**
     * swtich color depending
     * of the amount 
     */
    const  swtitchColor = [] 

    if (amount >max){

        swtitchColor.push("bg-danger", "bg-opacity-10")

    }

    else if  (gray ){

        swtitchColor.push("bg-light")
    }




    return (

        <>

        <Card>

            <Card.Body>

                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">

                <div className="me-2"> {name}</div>

                <div className="d-flex align-items-baseline">  {currencyFormat.format(amount)} {max &&
                (<span className="text-muted fs-6 ms-1"> / {currencyFormat.format(max)}</span>) }</div>

                </Card.Title>

                <ProgressBar 
                className="rounded-pill"
                variant={checkVariaceChange}
                min={0}
                max={max}
                now={amount}
                />

           <Stack direction="horizontal" gap="2" className="mt-4">

            

                <Button variant="outline-primary" className='ms-auto'>
                

                Add expenses
                
                </Button> 

                <Button variant="outline-primary" >
                

                View Expenses
                
                </Button> 




           </Stack>



            </Card.Body>

        </Card>
        
        </>

    );

   function checkVariaceChange(amount,max){


    const  ratio = amount/max


    if ( ratio <0.5 ){
        return "primary"
    }



    if (ratio> 0.75){

        return "warring"
    }


    return "danger "


    }

}