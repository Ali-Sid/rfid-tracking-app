import { CloseIcon } from "@chakra-ui/icons";

const SaveButton = ({ onClick }) => {
  return (
    <button className="custom-button cancel-button" onClick={onClick} type='submit' >
      <div className='button-text'>Cancel</div>
      <div className="icon-container" style={{height: "30px", color: "#575757", backgroundColor: "#ccc"}}>
        <CloseIcon className="button-icon" height="12px" />
      </div>
    </button>
  );
};

export default SaveButton;
