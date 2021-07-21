import React, {useState} from 'react';
import Picker from 'emoji-picker-react';

/**
 * Emoji picker example
 *
 * @return {object} JSX
 */
function Emoji() {
  const [emoji, setEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setEmoji(emojiObject);
  };

  return (
    <>
      <Picker onEmojiClick={onEmojiClick} />
      <div>
        <h2>{emoji ? emoji.emoji : ''}</h2>
      </div>
    </>
  );
};

export default Emoji;
