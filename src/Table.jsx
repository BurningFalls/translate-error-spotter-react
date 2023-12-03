import React, { useState } from 'react';
import './Table.css'
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';

export default function Table(props) {
  const { resultsKorean, resultsEnglish } = props;

  // 현재 일치하지 않는 행만 보여줄지 여부를 추적하는 상태
  const [showMismatchedRows, setShowMismatchedRows] = useState(false);

  // 한국어 감정과 영어 감정이 일치하지 않는 행만 필터링합니다.
  const mismatchedKoreanRows = resultsKorean.filter((result, index) => result.sentiment !== resultsEnglish[index].sentiment);
  const mismatchedEnglishRows = resultsEnglish.filter((result, index) => result.sentiment !== resultsKorean[index].sentiment);

  return (
    <div>
      <div className="button-container">
        <MDBBtnGroup shadow='0' className="change-button">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <MDBBtn color='secondary' onClick={() => setShowMismatchedRows(false)}>
              전체 문장 보기
            </MDBBtn>
            <MDBBtn color='secondary' onClick={() => setShowMismatchedRows(true)}>
              불일치 문장 보기
            </MDBBtn>
          </div>
        </MDBBtnGroup>
      </div>
      <div className="table-container">
        <MDBTable className="data-table">
          <MDBTableBody>
            {mismatchedKoreanRows.length === 0 && showMismatchedRows ? (
              <tr>
                <td className="empty">No Data</td>
              </tr>
            ) : (
              showMismatchedRows ? (
                mismatchedKoreanRows.map((result, index) => (
                  <tr key={index} className={`korean-sentiments different`}>
                    <td className="korean-sentence">{result.sentence}</td>
                    <td className="korean-sentiment">{result.sentiment}</td>
                    <td className="comparison">
                      ≠
                    </td>
                    <td className="english-sentiment">{mismatchedEnglishRows[index].sentiment}</td>
                    <td className="english-sentence">{mismatchedEnglishRows[index].sentence}</td>
                  </tr>
                ))
              ) : (
                resultsKorean.map((result, index) => (
                  <tr key={index} className={`korean-sentiments ${result.sentiment !== resultsEnglish[index].sentiment ? 'different' : ''}`}>
                    <td className="korean-sentence">{result.sentence}</td>
                    <td className="korean-sentiment">{result.sentiment}</td>
                    <td className="comparison">
                      {result.sentiment === resultsEnglish[index].sentiment ? '=' : '≠'}
                    </td>
                    <td className="english-sentiment">{resultsEnglish[index].sentiment}</td>
                    <td className="english-sentence">{resultsEnglish[index].sentence}</td>
                  </tr>
                ))
              )
            )}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}
