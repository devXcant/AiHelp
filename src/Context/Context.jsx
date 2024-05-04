import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {


    const[input, setInput] = useState('')
    const [recentPrompt, setRecentPrompt] = useState('')
    const [previousPrompt, setPreviousPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState('')

    const delayPara = (index, nextWord) => {

    }

    const onSent = async (prompt) => {

        setResultData('');
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await runChat(input);
        let responseArray = response.split("**");
        let newResponse
        for(let i = 0; i < responseArray.length; i++){
            if(i === 0 || i%2 !== 1 ){
                newResponse += responseArray[i]
            } else{
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        setResultData(newResponse2)
        setLoading(false)
        setInput('')
    }



    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        resultData,
        setInput,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider