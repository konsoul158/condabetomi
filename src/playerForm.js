import "./playerForm.css"
import { useState } from "react";

let toast   = ''
let owner   = ''
let content = ''

export default function component(props) {
    let open        = props.formInfo['open'];
    let toasts      = props.formInfo['toasts']
    let setToasts   = props.formInfo['setToasts']
    let owners      = props.formInfo['owners']
    let setOwners   = props.formInfo['setOwners']
    let contents    = props.formInfo['contents']
    let setContents = props.formInfo['setContents']
    let doneToast   = props.formInfo['doneToast']
    let setDoneToast = props.formInfo['setDoneToast']



    function newToastSubmit () {
      setToasts(toasts => [...toasts, toast])
      setOwners(owners => [...owners, owner])
      setContents(contents => [...contents, content])

      setDoneToast(true)
    }


    return (
      <div>
        {open && (
          <div>
        <table className="playerForm">
          <td>
          <tr>
            Name of Tosta <br/><input id="toast" onChange={(e) => {toast = e.target.value}}/>
          </tr>   
          <tr>
            Owner of Tosta<br/><input id="player" onChange={(e) => {owner = e.target.value}}/>
          </tr> 
          <tr>
            Contest of Tosta<br/><input id="description" onChange={(e) => {content = e.target.value}}/>
          </tr>
          </td>
        </table>
        <button className="button-56" role="button" onClick = {newToastSubmit}> <div className='headOfcolumn'> Tosta done </div> </button>
        </div>
        )}
      </div>
    );
  }