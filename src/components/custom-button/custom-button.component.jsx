import React, { useState } from 'react';
import { Typography } from 'antd';
import './custom-button.styles.css';

const CustomButton = ({
  buttonText,
  customStyle,
  withHoveringEffect,
  onClickListener,
}) => {
  const [buttonContent, setButtonContent] = useState(buttonText);
  const { Text } = Typography;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {withHoveringEffect ? (
        <button
          className="custom-button"
          onMouseEnter={(e) => setButtonContent('Next')}
          onMouseLeave={(e) => setButtonContent(buttonText)}
          style={{ ...customStyle }}
          onClick={onClickListener && onClickListener}
        >
          {buttonContent === 'Next' ? (
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Next &#8594;
            </Text>
          ) : (
            buttonContent
          )}
        </button>
      ) : (
        <button
          className="custom-button"
          onClick={onClickListener && onClickListener}
          style={{ ...customStyle }}
        >
          {buttonContent}
        </button>
      )}
    </div>
  );
};

export default CustomButton;
