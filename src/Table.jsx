import React from 'react';
import './Table.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function Table(props) {
  const { resultsKorean, resultsEnglish } = props;

  return (
    <div className="table-container">
      <MDBTable className="data-table">
        {/*<MDBTableHead>*/}
        {/*  <tr>*/}
        {/*    <th scope='col' className="korean-sentence">문장</th>*/}
        {/*    <th scope='col' className="korean-sentiment">감정</th>*/}
        {/*    <th scope='col'></th>*/}
        {/*    <th scope='col' className="english-sentiment">감정</th>*/}
        {/*    <th scope='col' className="english-sentence">문장</th>*/}
        {/*  </tr>*/}
        {/*</MDBTableHead>*/}
        <MDBTableBody>
          {resultsKorean.map((result, index) => (
            <tr key={index} className={`korean-sentiment ${result.sentiment !== resultsEnglish[index].sentiment ? 'different' : ''}`}>
              <td className="korean-sentence">{result.sentence}</td>
              <td className="korean-sentiment">{result.sentiment}</td>
              <td className="comparison">
                {result.sentiment === resultsEnglish[index].sentiment ? '=' : '≠'}
              </td>
              <td className="english-sentiment">{resultsEnglish[index].sentiment}</td>
              <td className="english-sentence">{resultsEnglish[index].sentence}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}