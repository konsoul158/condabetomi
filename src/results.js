import "./toastTable.css"

export default function component(props) {

    const toast         = props.toastinfo[0]
    const owner         = props.toastinfo[1]
    const content       = props.toastinfo[2]

    const vote          = props.vote

    console.log('vote: ' + vote.toString())
    // console.log('Owner: ' + owner.toString())
    // console.log('Votes: ' + votes.toString())


  return (
        <tr className = 'toast_table'>
            <td className = 'toast_table'>{toast}</td>
            <td className = 'toast_table'>{owner}</td>
            <td className = 'toast_table'>{content}</td>
            <td className = 'toast_table'>{vote}</td>
        </tr>
    );
  }