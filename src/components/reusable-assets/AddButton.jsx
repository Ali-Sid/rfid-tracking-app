import { AddIcon } from '@chakra-ui/icons';

const AddButton = ({ onClick }) => {
  return (
    <button className="custom-button" onClick={onClick} type='submit'>
      <div className='button-text'>New</div>
      <div className="icon-container">
        <AddIcon className="button-icon" style={{height: "10px"}} />
      </div>
    </button>

  );
};

export default AddButton;
