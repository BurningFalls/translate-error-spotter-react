import React, { useState } from 'react';
import './Modal.css'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, MDBInput, MDBDropdownItem, MDBDropdownToggle, MDBDropdown, MDBDropdownMenu,
} from 'mdb-react-ui-kit';

export default function Modal() {
  const [basicModal, setBasicModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('한글'); // 기본 언어 선택

  const toggleOpen = () => setBasicModal(!basicModal);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = async () => {
    let apiURL = '/bert/korean'; // 기본 API URL

    // 선택한 언어에 따라 API URL 변경
    if (selectedLanguage === '영어') {
      apiURL = '/bert/english';
    }

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <MDBBtn size='lg' outline onClick={toggleOpen}>BERT</MDBBtn>
      <MDBModal open={basicModal} setopen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
              <MDBModalHeader className="modal-header-container">
                <div className="modal-title">
                  <MDBModalTitle>&nbsp;USING BERT</MDBModalTitle>
                </div>
                  <MDBDropdown className="dropdown">
                    <MDBDropdownToggle color='info'>{selectedLanguage}</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem className="dropdown-item-1" onClick={() => handleLanguageChange('한글')}>한글</MDBDropdownItem>
                      <MDBDropdownItem className="dropdown-item-2" onClick={() => handleLanguageChange('영어')}>영어</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
              </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label='Text input'
                id='typeText'
                type='text'
                value={textInput}
                autocomplete="off"
                onChange={(e) => setTextInput(e.target.value)}
              />
              <p></p>
              <div>
                <ul>
                  {responseData.map((item, index) => (
                    <li key={index}>
                      <strong>{item.label}:</strong> {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(item.score * 100)}%
                    </li>
                  ))}
                </ul>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              {/*<MDBBtn color='secondary' onClick={toggleOpen}>*/}
              {/*  Close*/}
              {/*</MDBBtn>*/}
              <MDBBtn onClick={handleSubmit}>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}