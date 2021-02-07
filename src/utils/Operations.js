function removesNulls(currentCalculation){
    currentCalculation = currentCalculation.filter((element) => {
        return element != null;
      })

      return currentCalculation

}

function concatNumbers(displayArray){
    let currentElement, nextElement
    

    for(let i  = 0; i < displayArray.length - 1; i++){
        currentElement = displayArray[i]
        nextElement = displayArray[i+1]
        if(((!isNaN(currentElement) && !isNaN(nextElement))) || nextElement === '.'){
            displayArray[i+1] = currentElement.concat(nextElement)
            displayArray[i] = null
        }
        else if(i === 0 && displayArray[i] === '-'){
            displayArray[i+1] = currentElement.concat(nextElement)
            displayArray[i] = null
        }
    }
    displayArray = removesNulls(displayArray)

    return displayArray
}

module.exports = {
calculations(operation){
    
    let currentCalculation = operation
    currentCalculation = currentCalculation.split('')

    currentCalculation = concatNumbers(currentCalculation)

    let laterNumber, previousNumber, index = 0

    if (isNaN(currentCalculation[currentCalculation.length - 1]) && currentCalculation[currentCalculation.length -1] !== '.'){
        return 'Error'
    }
    
    while(true){
        for(index = 0; index < currentCalculation.length;){

            laterNumber = currentCalculation[index]

            if(currentCalculation[index] === '/'){
                laterNumber = Number(previousNumber)/Number(currentCalculation[index+1])      
                currentCalculation[index+1] = laterNumber    
                currentCalculation[index-1] = null
                currentCalculation[index] = null    
            }

            else if(currentCalculation[index] === '*'){
                laterNumber = Number(previousNumber)*Number(currentCalculation[index+1]) 
                currentCalculation[index+1] = laterNumber                
                currentCalculation[index-1] = null
                currentCalculation[index] = null    
            }


            previousNumber = laterNumber
            index++
            

        }

        index = 0
        currentCalculation = removesNulls(currentCalculation)

        for(index = 0; index < currentCalculation.length;){
            laterNumber = currentCalculation[index]

            if(currentCalculation[index] === '+'){
                laterNumber = Number(previousNumber)+Number(currentCalculation[index+1]) 
                currentCalculation[index+1] = laterNumber
                currentCalculation[index-1] = null
                currentCalculation[index] = null  

            }

            else if(currentCalculation[index] === '-'){
                laterNumber = Number(previousNumber)-Number(currentCalculation[index+1]) 
                currentCalculation[index+1] = laterNumber
                currentCalculation[index-1] = null
                currentCalculation[index] = null  
            }
      
            previousNumber = laterNumber
            index++
            console.log(currentCalculation)
        }

        currentCalculation = removesNulls(currentCalculation)
        
        index = 0
        console.log(currentCalculation)
        if(currentCalculation.length === 1){
            break
        }
    }

    return laterNumber
    
}
}