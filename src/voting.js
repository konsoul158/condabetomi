import "./toastTable.css"

export default function component(props) {

    const toast         = props.toastinfo[0]
    const owner         = props.toastinfo[1]
    const content       = props.toastinfo[2]

    const voteCount     = props.voteCount

    // function toVote (e) {
    //     const value = e.target.value

    //     if (isInt(value))
    //         setVotes(votes => [...votes, value])
    //     else
    //         setVotes(votes => [...votes, 0])
    // }


  return (
        <tr className = 'toast_table'>
            <td className = 'toast_table'>{toast}</td>
            <td className = 'toast_table'>{owner}</td>
            <td className = 'toast_table'>{content}</td>
            <td className = 'toast_table'><input id={'input' + voteCount.toString()}/></td>
        </tr>
    );
  }