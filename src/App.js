import './App.css';
import { useEffect, useState } from "react";
import PlayerForm from "./playerForm.js"
import NewToast from "./newToast.js"
import Voting from "./voting.js"
import Results from "./results.js"
import  "./toastTable.css"


function App() {

  const [isPlayerFormOpen, setPlayerFormOpen] = useState(false)
  const [doneToast, setDoneToast]             = useState(false)
  const [moreToasts, setMoreToasts]           = useState(true)
  const [voting, setVoting]                   = useState(false)
  const [showResults, setShowResults]         = useState(false)
  const [toasts, setToasts]                   = useState([])
  const [owners, setOwners]                   = useState([])
  const [contents, setContents]               = useState([])
  const [row, setRow]                         = useState([])
  const [rowVotes, setRowVotes]               = useState([])
  const [rowResults, setRowResults]           = useState([])
  const [votes, setVotes]                     = useState([])
  const [pickedOwner, setPickedOwner]         = useState('')
  const [ownersLeft2vote, setOwnersLeft2vote] = useState([])
  const [count, setCount]                     = useState(-1)
  const [countTrigger, setCountTrigger]       = useState(false)
  const [voteTrigger, setVoteTrigger]         = useState(false)

  const [voteCount, setVoteCount] = useState(0)

  const formInfo = {open        : isPlayerFormOpen, 
                    toasts      : toasts,
                    setToasts   : setToasts,
                    owners      : owners,
                    setOwners   : setOwners, 
                    contents    : contents,
                    setContents : setContents,
                    doneToast   : doneToast,
                    setDoneToast : setDoneToast
                    }
                    
  const toastinfo = [toasts.slice(-1), owners.slice(-1), contents.slice(-1)]

  function newToast () {
    isPlayerFormOpen ? setPlayerFormOpen(false) : setPlayerFormOpen(true)
  }

  function votationsStart () {
    if (owners.length >= 2) {
      setMoreToasts(false)
      setVoting(true)
      
      
      setPickedOwner(owners.slice(-1))
      ownersLeft2vote.pop()
      setOwnersLeft2vote(ownersLeft2vote)
    
      setVoteTrigger(!voteTrigger)
    }
  }

  function votations () {
    setPickedOwner(ownersLeft2vote.slice(-1))
    ownersLeft2vote.pop()
    setOwnersLeft2vote(ownersLeft2vote)

    for(let i = 0; i < owners.length; i++){
      document.getElementById('input' + i.toString()).disabled = false
    }

    setVoteTrigger(!voteTrigger)
  }


  function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


  function voteRN (e) {
    let value = 0
    let array = []
    e.preventDefault();

    if ( ! (document.getElementById('input0' ).disabled & document.getElementById('input1' ).disabled)) {
      for(let i = 0; i < voteCount; i++){
          value = Number(document.getElementById('input' + i.toString()).value)

          if (isNumber(value)){
            if (value < 0 || value > 10){
              value = 0
            }
            array.push(value)
            
          }
          else{
            array.push(0)
          }

          document.getElementById('input' + i.toString()).value = ''

          document.getElementById('input' + i.toString()).disabled = true

      }

      setVotes(votes => [...votes, array])
    }
    
  };

  function averageVotes () {
    let _votes = []
    
    let sum = 0

    for(let i = 0; i < owners.length; i++){
      for(let j = 0; j < owners.length; j++){
        sum = sum + votes[j][i]
      }

      _votes.push(sum / (owners.length - 1))
      sum = 0
    }

    setVotes(_votes)
  }


  function showingResults (e) {
    setShowResults(true)
    setCountTrigger(true)
    setCount(0)
    averageVotes()

    // let votes_copy = votes.slice(0, votes.length)
    

    // for(let i = 0; i < owners.length; i++){
    //   toastinfo_final = [toasts.at(i), owners.at(i), contents.at(i)]

    //   console.log(toastinfo_final)
    //   setRowResults(rowResults => [<Results toastinfo = {toastinfo_final} votes = {votes.at(i)}/>, ...rowResults])

    // }

  }

  useEffect(() => {
    console.log('entrei: ' + count.toString())

    if (count > -1 && count < owners.length){
      const toastinfo_final = [toasts.at(count), owners.at(count), contents.at(count)]

      setRowResults(rowResults => [<Results toastinfo = {toastinfo_final} vote = {votes.at(count)}/>, ...rowResults])

      setCount(count + 1)
      countTrigger ? setCountTrigger(false) : setCountTrigger(true)
    }

  }, [countTrigger])


  useEffect(() => {
    console.log('showResults' + showResults.toString())
    if (voting && !showResults){
      const _owner = pickedOwner[0].toString()

      document.getElementById('input' + owners.indexOf(_owner).toString()).disabled = true
    }
  }, [voteTrigger])


  // console.log(doneToast)
  useEffect(() => {
    if (doneToast) {
      setRow(row => [<NewToast toastinfo = {toastinfo}/>, ...row])
      setRowVotes(rowVotes => [<Voting toastinfo = {toastinfo} voteCount = {voteCount}/>, ...rowVotes])
      setVoteCount(voteCount + 1)
    }

    setOwnersLeft2vote(owners.slice(0, owners.length))
    setDoneToast(false)

  }, [doneToast])



  return (
    <div>
      <h1 className="app_title">
        ConDaBeToMi
      </h1>
      <h3 className="app_subtitle">
        Contest of the Best Tosta Mista 
      </h3>
      <div className="form">
        <table className=''>
          <td>
          {moreToasts && (
            <div>
            <button className="button-55" onClick={newToast}> <div className='headOfcolumn'> New Tosta </div> </button>
            <PlayerForm formInfo = {formInfo}/>
            <button className="button-55" onClick={votationsStart}> <div className='headOfcolumn'> Voting </div> </button>
            </div>
            )}
            {!moreToasts && ownersLeft2vote.length > 0 &&(
                <button className="button-55" onClick={votations}> <div className='headOfcolumn'> New Vote </div> </button>
            )}
            {!moreToasts && ownersLeft2vote.length == 0 && !showResults &&(
                <button className="button-55" onClick={showingResults}> <div className='headOfcolumn'> Check results</div> </button>
            )}



          </td>
          <th>
          {!showResults && (
          <div className='pickedOwner'>{pickedOwner}</div>
          )}
            <table className="toast_table">
              <td className="toast_table_king">
                <div className='headOfcolumn'>Name of Tosta</div>
              </td>
              <td className="toast_table_king">
                <div className='headOfcolumn'>Owner of Tosta</div>
              </td>
              <td className="toast_table_king">
                <div className='headOfcolumn'>Content of Tosta</div>
              </td>
              {voting && (
              <td>
                <div className='headOfcolumn'>0-10</div>
              </td>
              )}
              {voting && !showResults && (
                rowVotes
              )}
              {!voting && !showResults && (
                row
                )}
              {showResults && (
                rowResults
              )}
            </table>
            {voting && !showResults &&(
              <button className="button-56" onClick={voteRN}>Vote</button>
            )}
          </th>
        </table>
      </div>
    </div>
  );
}

export default App;
