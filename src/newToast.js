import "./toastTable.css"

export default function component(props) {

  const toast       = props.toastinfo[0]
  const owner       = props.toastinfo[1]
  const content     = props.toastinfo[2]


  return (
      <tr className = 'toast_table'>
        <td className = 'toast_table'>{toast}</td>
        <td className = 'toast_table'>{owner}</td>
        <td className = 'toast_table'>{content}</td>
      </tr>
    );
  }