import './App.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {MDBBtn, MDBIcon, MDBSpinner} from "mdb-react-ui-kit";
import Footer from "./Footer";
import Table from "./Table";

function App() {
  const textarea1Ref = useRef(null);
  const textarea2Ref = useRef(null);

  const [textKorean, setTextKorean] = useState('');
  const [textEnglish, setTextEnglish] = useState('');
  const [resultsKorean, setResultsKorean] = useState([]);
  const [resultsEnglish, setResultsEnglish] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 변수 추가

  const handleTextChange = (event, language) => {
    const newText = event.target.value;
    language === 'korean' ? setTextKorean(newText) : setTextEnglish(newText);
  };

  const adjustHeight = () => {
    // Reset the height to 'auto' to allow the textareas to adjust to their content
    textarea1Ref.current.style.height = 'auto';

    textarea2Ref.current.style.height = 'auto';
    // Calculate the maximum height of both textareas

    const maxHeight = Math.max(
      textarea1Ref.current.scrollHeight,
      textarea2Ref.current.scrollHeight
    );
    // Set both textareas to the maximum height
    textarea1Ref.current.style.height = `${maxHeight}px`;
    textarea2Ref.current.style.height = `${maxHeight}px`;

  };

  const sendHttpRequest = useCallback(async (url, requestBody) => {
    try {
      setIsLoading(true); // 데이터 요청 시작 시 isLoading을 true로 설정

      const response = await fetch(url, {
        method: 'POST', // 또는 원하는 HTTP 메서드
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('서버 응답 오류');
      }
    } catch (error) {
      throw new Error(`HTTP 요청 오류: ${error.message}`);
    } finally {
      setIsLoading(false); // 데이터 요청 시작 시 isLoading을 true로 설정
    }
  }, []);

// 예제: /classify/korean 경로로 요청 보내기
  const handleSubmit = useCallback(async () => {
    if (textKorean.trim() === '' || textEnglish.trim() === '') {
      return;
    }

    try {
      const koreanUrl = '/classify/korean'; // 한국어 분석 경로
      const englishUrl = '/classify/english'; // 영어 분석 경로

      const koreanData = { text: textKorean };
      const englishData = {text: textEnglish};

      setIsLoading(true); // 데이터 요청 시작 시 isLoading을 true로 설정

      const [koreanResponse, englishResponse] = await Promise.all([
        sendHttpRequest(koreanUrl, koreanData),
        sendHttpRequest(englishUrl, englishData),
      ]);

      setResultsKorean(koreanResponse);
      setResultsEnglish(englishResponse);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false); // 데이터 요청 완료 시 isLoading을 false로 설정
    }
  }, [textKorean, textEnglish, sendHttpRequest]);

  // console.log("korea", resultsKorean)
  // console.log("english", resultsEnglish)

  useEffect(() => {
    if (isButtonClicked) {
      handleSubmit();
      setIsButtonClicked(false);
    }
  }, [isButtonClicked, handleSubmit]);

  const handleIconClick = () => {
    setIsButtonClicked(true);
    // 여기에 아이콘을 클릭했을 때 할 작업을 추가할 수 있습니다.
  };


  return (
    <div className="app">
      <div className="main">
        <div className="header">
          <div className="large-text">TEST</div>
          <div className="small-text">Translate Error SpotTer</div>
        </div>
        <hr />
        <div className="up-features">
          <div className="input-boxes">
            <div className="input-box-1">
              <div className="korean-setting">한글</div>
              <textarea
                placeholder="한글 원문/번역문 입력"
                ref={textarea1Ref}
                onInput={adjustHeight}
                value={textKorean}
                onChange={(e) => handleTextChange(e, 'korean')}
             />
            </div>
            <div className="right-arrow">
              <div>
                <MDBIcon fas icon="caret-right" />
              </div>
            </div>
            <div className="input-box-2">
              <div className="english-setting">영어</div>
              <textarea
                placeholder="영어 번역문/원문 입력"
                ref={textarea2Ref}
                onInput={adjustHeight}
                value={textEnglish}
                onChange={(e) => handleTextChange(e, 'english')}
              />
            </div>
          </div>
        </div>
        <div className="verification-button">
          <MDBBtn floating tag='a' onClick={handleIconClick}>
            <MDBIcon fas icon='paper-plane' />
          </MDBBtn>
        </div>

        {isLoading && (
          <div className="spinner" >
            <MDBSpinner role='status'>
              <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
          </div>
        )}

        {!isLoading && (
          <div>
            <Table resultsKorean={resultsKorean} resultsEnglish={resultsEnglish} />
          </div>
        )}

      <Footer/>
      </div>
    </div>
  );
}

export default App;
