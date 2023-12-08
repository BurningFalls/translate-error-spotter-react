import React, { useState } from 'react';
import './Modal.css'
import { ResponsivePie } from '@nivo/pie'
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
  const [isLoadData, setLoadData] = useState(false);

  const toggleOpen = () =>  {
    setBasicModal(!basicModal);
    setLoadData(false);
  }

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
        setLoadData(true);
        setResponseData(data);
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const colors = [
    'hsl(262, 70%, 50%)',
    'hsl(188, 70%, 50%)',
    'hsl(343, 70%, 50%)',
    'hsl(48, 70%, 50%)',
    // 원하는 만큼 색상을 추가할 수 있습니다.
  ];

  const myData = responseData.map((item, index) => ({
    id: item.label,
    label: item.label,
    value: new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(item.score * 100),
    color: colors[index % colors.length], // 인덱스에 따라 색상을 선택
  }));

  const MyResponsivePie = ({ myData /* see data tab */ }) => (
    <ResponsivePie
      data={myData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            '2'
          ]
        ]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'ruby'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'c'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'go'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'python'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'scala'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'lisp'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'elixir'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'javascript'
          },
          id: 'lines'
        }
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 30,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 80,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )


  return (
    <div className="bert-button">
      <MDBBtn size='lg' outline onClick={toggleOpen}>BERT</MDBBtn>
      <MDBModal staticBackdrop open={basicModal} setopen={setBasicModal} tabIndex='-1'>
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
                onClick={() => setLoadData(false)}
              />
              <p></p>

              {isLoadData && (
                <div className="result-data">
                  {/*<div className="result-number">*/}
                  {/*  <ul>*/}
                  {/*    {responseData.map((item, index) => (*/}
                  {/*      <li key={index}>*/}
                  {/*        <strong>{item.label}:</strong> {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(item.score * 100)}%*/}
                  {/*      </li>*/}
                  {/*    ))}*/}
                  {/*  </ul>*/}
                  {/*</div>*/}

                  <div className="result-chart">
                    <MyResponsivePie myData={myData} />
                  </div>
                </div>
              )}

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
    </div>
  );
}