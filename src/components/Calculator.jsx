import React, { Component } from 'react'

import Button from './Button'
import Display from './Display'
import { calculations} from '../utils/Operations'

import '../css/calculator.css'

const initialState = {
    displayValue: '0',
    resetCalculation: false
}



export default class Calculator extends Component {

    constructor(props){

        super(props)
        this.clearAll = this.clearAll.bind(this)
        this.clearOne = this.clearOne.bind(this)
        this.addChar = this.addChar.bind(this)
        this.performOperation = this.performOperation.bind(this)
        this.zeroIsIndifferent = this.zeroIsIndifferent.bind(this)
        this.twoConsecutiveOperatingSymbols = this.twoConsecutiveOperatingSymbols.bind(this)
        this.operationWentWrong = this.operationWentWrong.bind(this)

    }

    state = {...initialState}

    zeroIsIndifferent(character){
        return (this.state.displayValue == '0' && (!isNaN(character) || character === '-'))
    }
    startANewValue(character){
        return ((this.state.resetCalculation && !isNaN(character)) || this.operationWentWrong())
    }
    operationWentWrong(){
        return this.state.displayValue === 'Error'
    }
    twoConsecutiveOperatingSymbols(displayArray){
        return isNaN(displayArray[displayArray.length-1]) && displayArray[displayArray.length-1] !== '.'
    }

    clearAll(){
        this.setState({...initialState})
    }
    clearOne(){

        let displayValue = this.state.displayValue + ''
        let displayValueArray = displayValue.split('')
        
        displayValueArray.pop()
        
        if(displayValueArray.length === 0){
            displayValueArray.push(0)
        }
        else if(this.operationWentWrong()){
            this.clearAll()
            return
        }
        displayValue = displayValueArray.join('')
        this.setState({displayValue, resetCalculation: false})
    }

    addChar(character){

        let resetCalculation = this.zeroIsIndifferent(character) || this.startANewValue(character)
        let currentValue = resetCalculation ? '' : this.state.displayValue + '' 
        let displayArray = currentValue.split('')

        if(isNaN(character)){
            if(character === '.' && isNaN(displayArray[displayArray.length-1])){
                return
            }
            else if(character === '.'){
                for(let i = displayArray.length-1; i > 0; i--){
                    if(isNaN(displayArray[i]) && displayArray[i] === '.'){
                        return
                    }
                    else if(isNaN(displayArray[i]) && displayArray[i] !== '.'){
                        break
                    }
                }
            }                        
            else {
                if(this.zeroIsIndifferent(character) || (this.operationWentWrong() && character === '-')){
                    const displayValue = currentValue + character
                    this.setState({displayValue, resetCalculation: false})
                    return
                }
                else if(this.twoConsecutiveOperatingSymbols(displayArray) && !this.zeroIsIndifferent(character)){
                    return
                }
            }
        }

        const displayValue = currentValue + character
        this.setState({displayValue, resetCalculation: false})
    }

    performOperation(){
        let displayValue = calculations(this.state.displayValue)
        if (!isFinite(displayValue)){
            displayValue = 'Error'
        }
        this.setState({displayValue, resetCalculation: true})
    }

    render(){

        return(
            <div id="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearAll} double/>
                <Button label="C" click={this.clearOne} double/>
                <Button label="7" click={this.addChar}/>
                <Button label="8" click={this.addChar}/>
                <Button label="9" click={this.addChar}/>
                <Button label="/" click={this.addChar} calculation/>
                <Button label="4" click={this.addChar}/>
                <Button label="5" click={this.addChar}/>
                <Button label="6" click={this.addChar}/>
                <Button label="*" click={this.addChar} calculation/>
                <Button label="1" click={this.addChar}/>
                <Button label="2" click={this.addChar}/>
                <Button label="3" click={this.addChar}/>
                <Button label="-" click={this.addChar} calculation/>
                <Button label="." click={this.addChar} calculation/>
                <Button label="0" click={this.addChar}/>
                <Button label="+" click={this.addChar} calculation/>
                <Button label="=" click={this.performOperation} equal/>
            </div>
        )
    }
}