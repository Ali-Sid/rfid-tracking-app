import { EditIcon } from '@chakra-ui/icons';

const EditButton = ({ onClick }) => {
 return (
    // <button type="submit" onClick={onClick}>
    //   <span style={{marginRight: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}><EditIcon /></span>Edit
    // </button>
    <button className="custom-button" onClick={onClick} type='submit'>
      <div className='button-text'>Edit</div>
      <div className="icon-container">
        <EditIcon className="button-icon" style={{height: "10px"}} />
      </div>
    </button>
 );
};

export default EditButton;
