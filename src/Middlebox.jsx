import React from 'react';
import './Middlebox.css'

export default function Middlebox (props){
  const { resultsKorean, resultsEnglish } = props;

  return (
    <div className="middle">
      <div className="middle-box">
        <div className="middle-box-wrap">
          {resultsKorean.map((result, index) => (
            <div key={index} className="middle-box-wrap-wrap-L">
              <div className="middle-sentiment-box-L">
                {result.sentiment}
              </div>
              <div className="middle-sentence-box">{result.sentence}</div>
            </div>
          ))}
        </div>
        <div className="middle-box-wrap">
          {resultsEnglish.map((result, index) => (
            <div key={index} className="middle-box-wrap-wrap-R">
              <div className="middle-sentiment-box-R">
                {result.sentiment}
              </div>
              <div className="middle-sentence-box">{result.sentence}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}