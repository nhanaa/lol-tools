import { confirmAlert } from "react-confirm-alert";
import SavedDrafts from "../components/SavedDrafts";

const loadDrafts = (drafts, handleClickLoad, handleClickDelete) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h1>Choose the draft you want to load.</h1>
          {drafts.map((draft, index) => (
            <SavedDrafts
              key={draft._id} onClose={onClose}
              handleClickLoad={handleClickLoad}
              handleClickDelete={handleClickDelete}
              draft={draft}
            />
          ))}
        </div>
      )
    }
  })
}

export default loadDrafts;
