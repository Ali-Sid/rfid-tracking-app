import { AddIcon } from "@chakra-ui/icons";

const SaveButton = ({ onClick }) => {
  return (
    <button className="custom-button" onClick={onClick} type='submit' style={{height: "30px"}}>
      <div className='button-text'>Add</div>
      <div className="icon-container">
        <AddIcon className="button-icon icon-style" height="12px"/>
      </div>
    </button>
  );
};

export default SaveButton;
