const Summary = ({ data }) => {
  return (
    <table className="w-100">
      {data.map((d) => (
        <tr>
          <td>{d[0]}</td>
          {d[1].map((el) => (
            <td>{el}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

/*
<Summary
  data={[
    ["Tech", ["React", "Node"]],
    ["Role", ["Individual", "Grad School"]],
  ]}
/>
*/

export default Summary;
